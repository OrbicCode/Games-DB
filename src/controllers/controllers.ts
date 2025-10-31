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

export async function getGameById(req: Request, res: Response) {
  try {
    const game = await gamesService.getGameById(req.params.id);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get game' });
  }
}

export async function createGame(req: Request, res: Response) {
  try {
    const game = await gamesService.createGame(req.body);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
}
