// Typings
import {
  HandlerArgs,
  HandlersConfig,
  SetupSubscribersBaseArgs
} from '../../typings/events.typings';

// Emitters
import { emitGetUserInfo, emitGetBusinessInfo } from '../emitters';

// Constants
import {
  PlayerEventNames,
  PLayerBusinessEventPayloadType
} from '@src/game-core';


// Local types
type GetGameInfoHandler = HandlerArgs & {
  payload: PLayerBusinessEventPayloadType
};


// Handlers
const handleGetGameInfo = ({ client, playerInstance, payload }: GetGameInfoHandler): void => {
  emitGetUserInfo({ client, playerInstance });
  emitGetBusinessInfo({ client, playerInstance, payload })
}

const handleGetBusinessInfo = ({ client, playerInstance, payload }: GetGameInfoHandler): void => {
  emitGetBusinessInfo({ client, playerInstance, payload })
}


// Config
const playerHandlersConfig: HandlersConfig<PlayerEventNames> = [
  { eventName: PlayerEventNames.BUY_BUSINESS, handler: handleGetGameInfo },
  { eventName: PlayerEventNames.UPGRADE_BUSINESS, handler: handleGetGameInfo },
  { eventName: PlayerEventNames.START_GAIN_CAPITAL, handler: handleGetBusinessInfo },
  { eventName: PlayerEventNames.GAIN_CAPITAL, handler: handleGetGameInfo }
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
