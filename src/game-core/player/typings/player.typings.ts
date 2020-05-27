// Entities
import { BusinessIdType } from '../../business';

// Constants
import { PlayerEventNames } from '../constants';


export type PlayerBusinessType = {
  id: BusinessIdType
  title: string
  profit: number
  level: number
  price: number
  gainCapitalDurationMs: number
  isGainingCapital: boolean
  startGainCapitalTimestamp: number | null
  isBought: boolean
};

export interface IPlayer {
  capital: number
  addEventListener: (eventName: PlayerEventNames, handler: () => void) => void
  getAllBusinessesList: () => Array<PlayerBusinessType>
  getBusinessById: (businessId: BusinessIdType) => PlayerBusinessType | undefined
  hasEnoughMoney: (price: number) => boolean
  isOwnerOfBusiness: (businessId: BusinessIdType) => boolean
  buyBusiness: (businessId: BusinessIdType) => void
  upgradeBusiness(businessId: BusinessIdType): void
  gainCapital: (businessId: BusinessIdType) => void
}

export type PLayerBusinessEventPayloadType = {
  businessId: BusinessIdType
}
