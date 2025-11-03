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
    const result = await pool.query(`
      SELECT * FROM games_list
      ORDER BY id
      `);
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

export async function updateGame(body: Partial<Game>, id: string): Promise<Game> {
  try {
    const updates: string[] = [];
    let values: any[] = [];
    let paramIndex: number = 1;

    if (body.title) {
      updates.push(`title = $${paramIndex++}`);
      values.push(body.title);
    }
    if (body.short_description) {
      updates.push(`description = $${paramIndex++}`);
      values.push(body.short_description);
    }
    if (body.genre) {
      updates.push(`genre = $${paramIndex++}`);
      values.push(body.genre);
    }
    if (body.release_date) {
      updates.push(`release_date = $${paramIndex++}`);
      values.push(body.release_date);
    }
    if (body.developer) {
      updates.push(`developer = $${paramIndex++}`);
      values.push(body.developer);
    }

    if (updates.length === 0) {
      throw new Error('no updates provided');
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE games_list
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex} 
      RETURNING *`,
      values
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
