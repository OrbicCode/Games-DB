import { Request, Response } from 'express';
import * as gamesService from '../services/services';

export async function getAllGames(req: Request, res: Response) {
  try {
    const games = await gamesService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get games' });
  }
}
