// Entities
import { BusinessType, BusinessConfigType } from '../../business';


export const formatBusinessConfig = (businessConfig: BusinessConfigType): BusinessType => ({
  id: businessConfig.id,
  title: businessConfig.title,
  price: businessConfig.price,
  profit: businessConfig.profit,
  gainCapitalDurationMs: businessConfig.gainCapitalDurationMs
});
