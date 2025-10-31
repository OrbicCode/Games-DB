import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createTable } from './models/models';
import { seedDatabase } from './services/services';
import { gamesRouter } from './routes/routes';

dotenv.config();

const app: Express = express();
const PORT: string | undefined = process.env.EXPRESS_PORT;
const SEED_DATABASE = true;

app.use(express.json());

async function initDB(): Promise<void> {
  try {
    await createTable();
    console.log('games_list table created');
    if (SEED_DATABASE) {
      await seedDatabase();
      console.log('Database seed complete.');
    }
  } catch (error) {
    console.error('Error initialising the database: ', error);
  }
}

initDB();

app.use('/games', gamesRouter);

app.listen(PORT, (): void => console.log(`Listening on port: ${PORT}`));
