// Typings
import {
  SocketHandlerArgs,
  SocketHandlersConfig,
  SetupSocketSubscribersBaseArgs
} from '../../typings/socket.typings';

// Utils
import { setupSocketSubscribers } from '../../utils/socket.utils';

// Emitters
import { emitUpdateUserInfo, emitGetBusinessList } from '../socket-emitters';

// Constants
import { GameActions } from '../../constants';


// Handlers
const handleUpdateUserInfo = ({ client, playerInstance }: SocketHandlerArgs): void => {
  emitUpdateUserInfo({ client, playerInstance });
};


const handleGetBusinessList = ({ client, playerInstance }: SocketHandlerArgs): void => {
  emitGetBusinessList({ client, playerInstance });
};


// Config
const socketHandlersConfig: SocketHandlersConfig = [
  { eventName: GameActions.UPDATE_USER_INFO, handler: handleUpdateUserInfo },
  { eventName: GameActions.GET_BUSINESS_LIST, handler: handleGetBusinessList },
];


export const setupGameInfoSocketHandlers = ({
  client,
  playerInstance
}: SetupSocketSubscribersBaseArgs): void => {
  setupSocketSubscribers({ client, playerInstance, socketHandlersConfig });
};
