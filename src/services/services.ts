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

export async function createGame(body: Partial<Game>): Promise<Game> {
  try {
    const fieldMap: { [key in keyof Partial<Game>]: string } = {
      title: 'title',
      short_description: 'description',
      genre: 'genre',
      release_date: 'release_date',
      developer: 'developer',
    };

    const fields = Object.keys(body)
      .filter((key) => key in fieldMap && body[key as keyof Game] !== undefined)
      .map((key) => fieldMap[key as keyof Game]);
    const values = Object.keys(body)
      .filter((key) => key in fieldMap && body[key as keyof Game] !== undefined)
      .map((key) => body[key as keyof Game]);

    const parameters = fields.map((_, index) => `$${index + 1}`).join(', ');

    const result = await pool.query(
      `INSERT INTO games_list
      (${fields.join(', ')})
      VALUES (${parameters}) 
      ON CONFLICT (title) DO NOTHING
      RETURNING *`,
      values
    );

    if (result.rowCount === 0) {
      throw new Error('Game with this title already exists');
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateGame(body: Game, id: string) {
  try {
  } catch (error) {}
}
