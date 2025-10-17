import express, { Express } from 'express';
import dotenv from 'dotenv';
import { createTable } from './models/models';
import { seedDatabase } from './services/services';

dotenv.config();

const app: Express = express();
const PORT: string | undefined = process.env.DB_PORT;

app.use(express.json());

async function initDB(): Promise<void> {
  try {
    await createTable();
    await seedDatabase();
    console.log('Database setup complete.');
  } catch (error) {
    console.error('Error initialising the database: ', error);
  }
}

initDB();

app.use('/games');

app.listen(PORT, (): void => console.log(`Listening on port: ${PORT}`));
