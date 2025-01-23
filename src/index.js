import './processors/mailProcessor.js';

import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import { connectDB } from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import channelSocketHandler from './controllers/channelSocketController.js';
import messageSocketHandler from './controllers/messageSocketController.js';
import apiRouter from './routers/apiRouter.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/ui', bullServerAdapter.getRouter());

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).send({ message: 'pong' });
});

app.use('/api', apiRouter);

io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);

  // socket.on('messageFromClient', (data) => {
  //   console.log('Message from client', data);

  //   io.emit('newMessage', data.toUpperCase());
  // });
  messageSocketHandler(io, socket);
  channelSocketHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
  connectDB();
});
