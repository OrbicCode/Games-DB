import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { fetchGames, Game } from './utils/fetchGames';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', async (req: Request, res: Response<Game[]>) => {
  const games = await fetchGames();
  res.send(games);
});

app.listen(PORT, (): void => console.log(`Listening on port: ${PORT}`));
