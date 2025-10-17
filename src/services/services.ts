import pool from '../config/db';
import { fetchGames } from '../utils/fetchGames';
import { Game } from '../utils/fetchGames';

export async function seedDatabase(): Promise<void> {
  try {
    const games: Game[] = await fetchGames();
    for (const game of games) {
      pool.query(
        'INSERT INTO games_list (title, description, genre, release_date, developer) VALUES ($1, $2, $3, $4, $5)',
        [game.title, game.short_description, game.genre, game.release_date, game.developer]
      );
    }
  } catch (error) {
    console.error('Failed to seed database', error);
    throw error;
  }
}
