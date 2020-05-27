// Modules
import http from 'http';
import socket from 'socket.io';

// Game core
import { Player } from '@src/game-core';

// Handlers
import {
  setupPlayerHandlers,
  setupBusinessSocketHandlers,
  setupGameInfoSocketHandlers
} from '../events/handlers';


export const startServer = (port: number): void => {
  const server = http.createServer();

  const io = socket(server);

  io.on('connection', client => {
    console.log('connected');

    const playerInstance = new Player();


    setupPlayerHandlers({ client, playerInstance });
    setupGameInfoSocketHandlers({ client, playerInstance });
    setupBusinessSocketHandlers({ client, playerInstance });


    client.on('disconnect', () => {
      console.log('disconnected');
    });
  })

  server.listen(port, () => {
    console.log(`Listening on ${port} port`);
  });
};
