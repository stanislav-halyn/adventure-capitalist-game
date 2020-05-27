// Utils
import { emit } from '../../utils/socket.utils';

// Typings
import { EmitterBaseArgs } from '../../typings/events.typings';

// Constants
import { GameActions } from '../../constants/socket-actions.constants';


export const emitGetUserInfo = ({
  client,
  playerInstance
}: EmitterBaseArgs): void => {
  const payload = { capital: playerInstance.capital };

  client.emit(GameActions.GET_USER_INFO, { data: payload });
};


export const emitGetBusinessList = ({
  client,
  playerInstance
}: EmitterBaseArgs): void => {
  const businessList = playerInstance.getAllBusinessesList();

  emit(client, GameActions.GET_BUSINESS_LIST, { data: { businessList } });
};
