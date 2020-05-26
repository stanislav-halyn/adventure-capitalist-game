// Entities
import { BusinessType } from '../../business';


export const formatBusinessConfig = <T> (businessConfig: Extract<T, BusinessType>): BusinessType => ({
  id: businessConfig.id,
  title: businessConfig.title,
  price: businessConfig.price,
  profit: businessConfig.profit,
  gainCapitalDurationMs: businessConfig.gainCapitalDurationMs
});
