// Typings
import {
  HandlerArgs,
  HandlersConfig,
  SetupSubscribersBaseArgs
} from '../../typings/events.typings';
import { UpdateBusinessClientPayload } from '../../typings/client-payload.typings';

// Utils
import { setupSocketSubscribers } from '../../utils/socket.utils';

// Constants
import { GameActions } from '../../constants';


// Local types
type UpdateBusinessHandler = HandlerArgs & {
  payload: UpdateBusinessClientPayload
};


// Handlers
const handleBuyBusiness = ({ playerInstance, payload }: UpdateBusinessHandler): void => {
  const { businessId } = payload;

  playerInstance.buyBusiness(businessId);
};


const handleUpgradeBusiness = ({ playerInstance, payload }: UpdateBusinessHandler): void => {
  const { businessId } = payload;

  playerInstance.upgradeBusiness(businessId);
};


const handleGainCapital = ({ playerInstance, payload }: UpdateBusinessHandler): void => {
  const { businessId } = payload;

  playerInstance.gainCapital(businessId);
};


// Config
const socketHandlersConfig: HandlersConfig<GameActions> = [
  { eventName: GameActions.BUY_BUSINESS, handler: handleBuyBusiness },
  { eventName: GameActions.UPGRADE_BUSINESS, handler: handleUpgradeBusiness },
  { eventName: GameActions.GAIN_CAPITAL, handler: handleGainCapital }
];


export const setupBusinessSocketHandlers = ({
  client,
  playerInstance
}: SetupSubscribersBaseArgs): void => {
  setupSocketSubscribers({ client, playerInstance, socketHandlersConfig });
};
