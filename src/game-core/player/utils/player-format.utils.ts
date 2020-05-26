// Typings
import { PlayerBusinessType } from '../typings/player.typings';
import { Optional } from '@src/utils/typings.utils';


type OptionalBusinessFields = 'level' | 'isGainingCapital' | 'gainCapitalStartTimestamp';
type FormatBusinessConfigType = Optional<PlayerBusinessType, OptionalBusinessFields>

export const formatBusinessConfig = <T> (
  businessConfig: Extract<T, FormatBusinessConfigType>
): PlayerBusinessType => ({
  id: businessConfig.id,
  title: businessConfig.title,
  profit: businessConfig.profit,
  level: businessConfig.level || 0,
  price: businessConfig.price,
  gainCapitalDurationMs: businessConfig.gainCapitalDurationMs,
  isGainingCapital: businessConfig.isGainingCapital || false,
  gainCapitalStartTimestamp: businessConfig.gainCapitalStartTimestamp || null
});
