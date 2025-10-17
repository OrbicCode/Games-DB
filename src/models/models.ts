import pool from '../config/db';

export async function createTable(): Promise<void> {
  try {
    await pool.query(`
                CREATE TABLE IF NOT EXISTS games_list (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    genre VARCHAR(100) NOT NULL,
                    release_date VARCHAR(100) NOT NULL,
                    developer VARCHAR(100) NOT NULL
                );
            `);
    console.log('Database initialised or already exists');
  } catch (error) {
    console.error('Error creating games_list table:', error);
    throw error;
  }
}
