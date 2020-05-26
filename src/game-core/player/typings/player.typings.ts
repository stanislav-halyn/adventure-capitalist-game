// Entities
import { BusinessIdType } from '../../business';

// Constants
import { PlayerEventNames } from '../constants';


export interface IPlayer {
  capital: number
  addEventListener: (eventName: PlayerEventNames, handler: () => void) => void
  hasEnoughMoney: (price: number) => boolean
  isOwnerOfBusiness: (businessId: BusinessIdType) => boolean
  buyBusiness: (businessId: BusinessIdType) => void
  upgradeBusiness(businessId: BusinessIdType): void
  gainCapital: (businessId: BusinessIdType) => void
}
