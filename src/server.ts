import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT;

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
