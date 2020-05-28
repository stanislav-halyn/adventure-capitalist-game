// Typings
import { PlayerBusinessType } from '@src/game-core';


export type UpdateUserInfoResponseType = {
  capital: number
};

export type UpdateBusinessResponseType = {
  business?: PlayerBusinessType
};


export type GetBusinessListResponseType = {
  businessesList: Array<PlayerBusinessType>
};
