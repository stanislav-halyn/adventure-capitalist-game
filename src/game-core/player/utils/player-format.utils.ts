// Typings
import { Optional } from '@src/utils/typings.utils';
import { BusinessIdType } from '../../business';
import { PlayerBusinessType, PLayerBusinessEventPayloadType } from '../typings/player.typings';


type OptionalBusinessFields
  = 'level' | 'isGainingCapital' | 'startGainCapitalTimestamp' | 'isBought' | 'isManaged';
type FormatBusinessConfigType = Optional<PlayerBusinessType, OptionalBusinessFields>

type FormatBusinessArguments<T> = {
  business: Extract<T, FormatBusinessConfigType>,
  isManaged?: boolean
  isBought?: boolean
};

export const formatBusiness = <T> ({
  business,
  isManaged = false,
  isBought = false
}: FormatBusinessArguments<T>): PlayerBusinessType => ({
  id: business.id,
  title: business.title,
  profit: business.profit,
  level: business.level || 0,
  price: business.price,
  gainCapitalDurationMs: business.gainCapitalDurationMs,
  isGainingCapital: business.isGainingCapital || false,
  startGainCapitalTimestamp: business.startGainCapitalTimestamp || null,
  managerPrice: business.managerPrice,
  isManaged,
  isBought
});


export const formatPlayerBusinessEventPayload = (
  businessId: BusinessIdType
): PLayerBusinessEventPayloadType => ({
  businessId
});
