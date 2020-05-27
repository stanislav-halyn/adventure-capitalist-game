// Typings
import {
  HandlerArgs,
  HandlersConfig,
  SetupSubscribersBaseArgs
} from '../../typings/events.typings';

// Emitters
import { emitUpdateUserInfo, emitUpdateBusinessInfo } from '../emitters';

// Constants
import {
  PlayerEventNames,
  PLayerBusinessEventPayloadType
} from '@src/game-core';


// Local types
type UpdateGameInfoHandler = HandlerArgs & {
  payload: PLayerBusinessEventPayloadType
};


// Handlers
const handleUpdateGameInfo = ({ client, playerInstance, payload }: UpdateGameInfoHandler): void => {
  emitUpdateUserInfo({ client, playerInstance });
  emitUpdateBusinessInfo({ client, playerInstance, payload })
}


// Config
const playerHandlersConfig: HandlersConfig<PlayerEventNames> = [
  { eventName: PlayerEventNames.BUY_BUSINESS, handler: handleUpdateGameInfo },
  { eventName: PlayerEventNames.UPGRADE_BUSINESS, handler: handleUpdateGameInfo },
  { eventName: PlayerEventNames.GAIN_CAPITAL, handler: handleUpdateGameInfo },
];


export const setupPlayerHandlers = ({
  client,
  playerInstance
}: SetupSubscribersBaseArgs): void => {
  playerHandlersConfig.forEach(handlerConfig => {
    const { eventName, handler } = handlerConfig;

    playerInstance.addEventListener(eventName, (payload: PLayerBusinessEventPayloadType) => {
      handler({ client, playerInstance, payload });
    });
  });
};
