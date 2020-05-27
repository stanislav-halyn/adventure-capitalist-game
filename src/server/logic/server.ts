// Modules
import http from 'http';
import socket from 'socket.io';

// Game core
import {
  Player,
  PlayerEventNames,
  PLayerBusinessEventPayloadType
} from '@src/game-core';

// Socket handlers
import {
  setupBusinessSocketHandlers,
  setupGameInfoSocketHandlers
} from '../socket/socket-handlers';

// Socket emitters
import { emitUpdateUserInfo, emitUpdateBusinessInfo } from '../socket/socket-emitters';


export const startServer = (port: number): void => {
  const server = http.createServer();

  const io = socket(server);

  io.on('connection', client => {
    console.log('connected');

    const playerInstance = new Player();


    const handleGameInfoUpdate = (payload: PLayerBusinessEventPayloadType) => {
      emitUpdateUserInfo({ client, playerInstance });
      emitUpdateBusinessInfo({ client, playerInstance, payload })
    }

    playerInstance.addEventListener(PlayerEventNames.BUY_BUSINESS, handleGameInfoUpdate);
    playerInstance.addEventListener(PlayerEventNames.UPGRADE_BUSINESS, handleGameInfoUpdate);
    playerInstance.addEventListener(PlayerEventNames.GAIN_CAPITAL, handleGameInfoUpdate);

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
