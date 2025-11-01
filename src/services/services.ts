import pool from '../config/db';
import { fetchGames } from '../utils/fetchGames';
import { Game } from '../utils/fetchGames';

export async function seedDatabase(): Promise<void> {
  try {
    const games: Game[] = await fetchGames();
    for (const game of games) {
      await pool.query(
        `INSERT INTO games_list 
        (title, description, genre, release_date, developer) 
        VALUES ($1, $2, $3, $4, $5) 
        ON CONFLICT (title) DO NOTHING`,
        [game.title, game.short_description, game.genre, game.release_date, game.developer]
      );
    }
  } catch (error) {
    console.error('Failed to seed database', error);
    throw error;
  }
}

export async function getAllGames(): Promise<Game[] | undefined> {
  try {
    const result = await pool.query(`SELECT * FROM games_list`);
    return result.rows;
  } catch (error) {
    console.error('Failed to getAllGames: ', error);
    throw error;
  }
}

export async function getGameById(id: string): Promise<Game | undefined> {
  try {
    const result = await pool.query(
      `SELECT * FROM games_list
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Failed to getGameById');
  }
}

export async function createGame(body: Game): Promise<Game | undefined> {
  try {
    const { title, short_description, genre, release_date, developer } = body;
    const result = await pool.query(
      `INSERT INTO games_list
      (title, description, genre, release_date, developer)
      VALUES ($1, $2, $3, $4, $5) 
      ON CONFLICT (title) DO NOTHING
      RETURNING *`,
      [title, short_description, genre, release_date, developer]
    );

    if (result.rowCount === 0) {
      throw new Error('Game with this title already exists');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Failed to createGame', error);
    throw error;
  }
}

export async function updateGame(body: Game, id: string) {
  try {
    const { title, short_description, genre, release_date, developer } = body;
  } catch (error) {}
}
