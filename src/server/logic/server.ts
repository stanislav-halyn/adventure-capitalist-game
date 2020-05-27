// Modules
import http from 'http';
import socket from 'socket.io';

// Game core
import { Player, IPlayer } from '@src/game-core';

// Handlers
import {
  setupPlayerHandlers,
  setupBusinessSocketHandlers,
  setupGameInfoSocketHandlers
} from '../events/handlers';

// Constants
import { ServerActions } from '../constants/socket-actions.constants';

// Utils
import { handlePreflightRequest, getClientId } from '../utils/server.utils';


const clientsMap = new Map<string, IPlayer>();


export const startServer = (port: number): void => {
  const server = http.createServer();

  const io = socket(server, {
    handlePreflightRequest: handlePreflightRequest as any // eslint-disable-line
  });


  io.on('connection', client => {
    const clientId = getClientId(client);

    let playerInstance = clientsMap.get(clientId);

    if (!playerInstance) {
      client.emit(ServerActions.AUTHORIZATION, { clientId: client.id });

      playerInstance = new Player(client.id);
      clientsMap.set(client.id, playerInstance);
    }

    setupPlayerHandlers({ client, playerInstance });
    setupGameInfoSocketHandlers({ client, playerInstance });
    setupBusinessSocketHandlers({ client, playerInstance });


    client.on('disconnect', () => {
      client.removeAllListeners();
    });
  })

  server.listen(port, () => {
    console.log(`Listening on ${port} port`);
  });
};
