// Utils
import { emit } from '../../utils/socket.utils';

// Typings
import { PLayerBusinessEventPayloadType } from '@src/game-core';
import { EmitterArgs } from '../../typings/events.typings';

// Constants
import { GameActions } from '../../constants/socket-actions.constants';


export const emitGetBusinessInfo = ({
  client,
  playerInstance,
  payload
}: EmitterArgs<PLayerBusinessEventPayloadType>): void => {
  const { businessId } = payload;
  const business = playerInstance.getBusinessById(businessId);

  emit(client, GameActions.GET_BUSINESS_INFO, { data: { business } });
};
