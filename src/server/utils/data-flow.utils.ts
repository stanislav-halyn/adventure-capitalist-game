// Typings
import { IPlayer } from '@src/game-core';
import {
  UpdateUserInfoResponseType,
  UpdateBusinessResponseType
} from '../typings/server-response.typings';


export const prepareUpdateUserInfoDataForClient = (
  playerInstance: IPlayer
): UpdateUserInfoResponseType  => ({
  capital: playerInstance.capital
});


export const prepareUpdateBusinessDataForClient = (
  playerInstance: IPlayer,
  businessId: number
): UpdateBusinessResponseType => ({
  business: playerInstance.getBusinessById(businessId)
})
