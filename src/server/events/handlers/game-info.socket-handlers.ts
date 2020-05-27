// Typings
import {
  HandlerArgs,
  HandlersConfig,
  SetupSubscribersBaseArgs
} from '../../typings/events.typings';

// Utils
import { setupSocketSubscribers } from '../../utils/socket.utils';

// Emitters
import { emitUpdateUserInfo, emitGetBusinessList } from '../emitters';

// Constants
import { GameActions } from '../../constants';


// Handlers
const handleUpdateUserInfo = ({ client, playerInstance }: HandlerArgs): void => {
  emitUpdateUserInfo({ client, playerInstance });
};


const handleGetBusinessList = ({ client, playerInstance }: HandlerArgs): void => {
  emitGetBusinessList({ client, playerInstance });
};


// Config
const socketHandlersConfig: HandlersConfig = [
  { eventName: GameActions.UPDATE_USER_INFO, handler: handleUpdateUserInfo },
  { eventName: GameActions.GET_BUSINESS_LIST, handler: handleGetBusinessList },
];


export const setupGameInfoSocketHandlers = ({
  client,
  playerInstance
}: SetupSubscribersBaseArgs): void => {
  setupSocketSubscribers({ client, playerInstance, socketHandlersConfig });
};
