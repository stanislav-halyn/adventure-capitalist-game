// Modules
import http from 'http';
import socket from 'socket.io';

// Game core
import { Player, PlayerEventNames } from '@src/game-core';

// Constants
import { GameActions } from '../constants';

// Utils
import { prepareDataForClient } from '../utils/data-flow.utils';


export const startServer = (port: number): void => {
  const server = http.createServer();

  const io = socket(server);

  io.on('connection', client => {
    const playerInstance = new Player();


    playerInstance.addEventListener(PlayerEventNames.BUY_BUSINESS, () => {
      const data = prepareDataForClient(playerInstance);

      client.emit(GameActions.BUY_BUSINESS, { data });
    });

    playerInstance.addEventListener(PlayerEventNames.UPGRADE_BUSINESS, () => {
      const data = prepareDataForClient(playerInstance);

      client.emit(GameActions.UPGRADE_BUSINESS, { data });
    });

    playerInstance.addEventListener(PlayerEventNames.GAIN_CAPITAL, () => {
      const data = prepareDataForClient(playerInstance);

      client.emit(GameActions.GAIN_CAPITAL_COMPLETE, { data });
    });


    client.on(GameActions.SHOW_ALL_BUSINESSES, () => {
      const businessList = playerInstance.getAllBusinessesList();

      client.emit(GameActions.SHOW_ALL_BUSINESSES, { data: businessList });
    });


    client.on(GameActions.SHOW_MY_BUSINESSES, () => {
        const businessList = playerInstance.getMyBusinessesList();

      client.emit(GameActions.SHOW_MY_BUSINESSES, { data: businessList });
    });


    client.on(GameActions.BUY_BUSINESS, ({ data }) => {
      const { businessId } = data;

      playerInstance.buyBusiness(businessId);
    });


    client.on(GameActions.UPGRADE_BUSINESS, ({ data }) => {
      const { businessId } = data;

      playerInstance.upgradeBusiness(businessId);
    });


    client.on(GameActions.GAIN_CAPITAL, ({ data }) => {
      const { businessId } = data;

      playerInstance.gainCapital(businessId);

      client.emit(GameActions.GAIN_CAPITAL);
    });


    client.on('disconnect', () => {
      console.log('disconnected');
    });
  })

  server.listen(port, () => {
    console.log(`Listening on ${port} port`);
  });
};
