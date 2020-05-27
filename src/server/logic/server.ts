// Modules
import http from 'http';
import socket from 'socket.io';

// Game core
import {
  Player,
  PlayerEventNames,
  PLayerBusinessEventPayloadType,
  BusinessIdType
} from '@src/game-core';

// Constants
import { GameActions } from '../constants';

// Utils
import {
  prepareUpdateUserInfoDataForClient,
  prepareUpdateBusinessDataForClient
} from '../utils/data-flow.utils';


export const startServer = (port: number): void => {
  const server = http.createServer();

  const io = socket(server);

  io.on('connection', client => {
    console.log('connected');

    const playerInstance = new Player();


    const handleUpdateBusinessInfo = (businessId: BusinessIdType) => {
      const businessData = prepareUpdateBusinessDataForClient(playerInstance, businessId);
      client.emit(GameActions.UPDATE_BUSINESS_INFO, { data: businessData });
    };

    const handleUpdateUserInfo = () => {
      const userData = prepareUpdateUserInfoDataForClient(playerInstance);
      client.emit(GameActions.UPDATE_USER_INFO, { data: userData });
    };


    const handleGameInfoUpdate = ({ businessId }: PLayerBusinessEventPayloadType) => {
      handleUpdateBusinessInfo(businessId);
      handleUpdateUserInfo();
    }


    playerInstance.addEventListener(PlayerEventNames.BUY_BUSINESS, handleGameInfoUpdate);
    playerInstance.addEventListener(PlayerEventNames.UPGRADE_BUSINESS, handleGameInfoUpdate);
    playerInstance.addEventListener(PlayerEventNames.GAIN_CAPITAL, handleGameInfoUpdate);


    client.on(GameActions.UPDATE_USER_INFO, handleUpdateUserInfo);


    client.on(GameActions.GET_BUSINESS_LIST, () => {
      const businessList = playerInstance.getAllBusinessesList();

      client.emit(GameActions.GET_BUSINESS_LIST, { data: { businessList } });
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

      handleUpdateBusinessInfo(businessId);
    });


    client.on('disconnect', () => {
      console.log('disconnected');
    });
  })

  server.listen(port, () => {
    console.log(`Listening on ${port} port`);
  });
};
