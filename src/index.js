import './processors/mailProcessor.js';

import express from 'express';
import { StatusCodes } from 'http-status-codes';

import bullServerAdapter from './config/bullBoardConfig.js';
import { connectDB } from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routers/apiRouter.js';

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/ui', bullServerAdapter.getRouter());

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).send({ message: 'pong' });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectDB();
});
