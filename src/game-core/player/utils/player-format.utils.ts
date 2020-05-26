// Typings
import { PlayerBusinessType } from '../typings/player.typings';
import { Optional } from '@src/utils/typings.utils';


type OptionalBusinessFields = 'level' | 'isGainingCapital' | 'startGainCapitalTimestamp' | 'isBought';
type FormatBusinessConfigType = Optional<PlayerBusinessType, OptionalBusinessFields>

type FormatBusinessArguments<T> = {
  business: Extract<T, FormatBusinessConfigType>,
  isBought?: boolean
};

export const formatBusiness = <T> ({
  business,
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
  isBought
});
