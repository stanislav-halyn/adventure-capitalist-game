// Typings
import { IPlayer } from '@src/game-core';


export const prepareDataForClient = (playerInstance: IPlayer) => {
  const businessesList = playerInstance.getMyBusinessesList();

  return {
    capital: playerInstance.capital,
    businessesList
  };
}
