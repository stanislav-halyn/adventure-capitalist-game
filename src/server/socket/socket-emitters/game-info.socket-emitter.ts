// Utils
import { emit } from '../../utils/socket.utils';

// Typings
import { SocketEmitterBaseArgs } from '../../typings/socket.typings';

// Constants
import { GameActions } from '../../constants';


export const emitUpdateUserInfo = ({
  client,
  playerInstance
}: SocketEmitterBaseArgs): void => {
  const payload = { capital: playerInstance.capital };

  client.emit(GameActions.UPDATE_USER_INFO, { data: payload });
};


export const emitGetBusinessList = ({
  client,
  playerInstance
}: SocketEmitterBaseArgs): void => {
  const businessList = playerInstance.getAllBusinessesList();

  emit(client, GameActions.GET_BUSINESS_LIST, { data: { businessList } });
};
