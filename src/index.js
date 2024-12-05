import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { connectDB } from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).send({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectDB();
});
