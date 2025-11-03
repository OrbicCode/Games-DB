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
    if (!req.params.id) {
      return res
        .status(400)
        .json({ error: 'Id required to target the game that you want to edit' });
    }
    const idNum = parseInt(req.params.id);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'Invalid Id' });
    }
    const game = await gamesService.getGameById(req.params.id);
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get game' });
  }
}

export async function createGame(req: Request, res: Response) {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'title required' });
    }
    const game = await gamesService.createGame(req.body);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create game' });
  }
}

export async function updateGame(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ error: 'Id required to target the game that you want to edit' });
    }
    const idNum = parseInt(req.params.id);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'Invalid Id' });
    }
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: 'No updates provided' });
    }
    const game = await gamesService.updateGame(req.body, req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update game' });
  }
}
