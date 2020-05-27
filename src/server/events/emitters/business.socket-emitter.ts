// Utils
import { emit } from '../../utils/socket.utils';

// Typings
import { PLayerBusinessEventPayloadType } from '@src/game-core';
import { EmitterArgs } from '../../typings/events.typings';

// Constants
import { GameActions } from '../../constants';


export const emitUpdateBusinessInfo = ({
  client,
  playerInstance,
  payload
}: EmitterArgs<PLayerBusinessEventPayloadType>): void => {
  const { businessId } = payload;
  const business = playerInstance.getBusinessById(businessId);

  emit(client, GameActions.UPDATE_BUSINESS_INFO, { data: { business } });
};
