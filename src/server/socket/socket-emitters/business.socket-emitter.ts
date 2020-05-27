// Utils
import { emit } from '../../utils/socket.utils';

// Typings
import { PLayerBusinessEventPayloadType } from '@src/game-core';
import { SocketEmitterArgs } from '../../typings/socket.typings';

// Constants
import { GameActions } from '../../constants';


export const emitUpdateBusinessInfo = ({
  client,
  playerInstance,
  payload
}: SocketEmitterArgs<PLayerBusinessEventPayloadType>): void => {
  const { businessId } = payload;
  const business = playerInstance.getBusinessById(businessId);

  emit(client, GameActions.UPDATE_BUSINESS_INFO, { data: { business } });
};
