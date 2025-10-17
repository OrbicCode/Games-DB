import express from 'express';
import { getAllGames } from '../controllers/controllers';

export const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);
