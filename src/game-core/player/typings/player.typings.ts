// Entities
import { BusinessIdType } from '../../business';


export interface IPlayer {
  capital: number
  hasEnoughMoney: (price: number) => boolean
  isOwnerOfBusiness: (businessId: BusinessIdType) => boolean
  buyBusiness: (businessId: BusinessIdType) => void
  upgradeBusiness(businessId: BusinessIdType): void
  gainCapital: (businessId: BusinessIdType) => void
}
