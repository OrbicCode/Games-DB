import express from 'express';
import * as gamesControllers from '../controllers/controllers';

export const gamesRouter = express.Router();

gamesRouter.get('/', gamesControllers.getAllGames);

gamesRouter.get('/:id', gamesControllers.getGameById);

gamesRouter.post('/', gamesControllers.createGame);

gamesRouter.patch('/:id', gamesControllers.updateGame);

gamesRouter.delete('/:id', gamesControllers.deleteGame);
