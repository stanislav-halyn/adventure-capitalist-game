// Entities
import { BusinessIdType } from '../../business';

// Constants
import { PlayerEventNames } from '../constants/player.constants';


export type PlayerBusinessType = {
  id: BusinessIdType
  title: string
  profit: number
  level: number
  price: number
  gainCapitalDurationMs: number
  isGainingCapital: boolean
  startGainCapitalTimestamp: number | null
  managerPrice: number
  isBought: boolean
  isManaged: boolean
};

export type PlayerIdType = string;

export interface IPlayer {
  id: PlayerIdType
  capital: number
  addEventListener: <T>(eventName: PlayerEventNames, handler: (payload: T) => void) => void
  getAllBusinessesList: () => Array<PlayerBusinessType>
  getBusinessById: (businessId: BusinessIdType) => PlayerBusinessType | undefined
  hasEnoughMoney: (price: number) => boolean
  isOwnerOfBusiness: (businessId: BusinessIdType) => boolean
  isBusinessManaged: (businessId: BusinessIdType) => boolean
  buyBusiness: (businessId: BusinessIdType) => void
  upgradeBusiness(businessId: BusinessIdType): void
  gainCapital: (businessId: BusinessIdType) => void
  hireManager: (businessId: BusinessIdType) => void
}

export type PLayerBusinessEventPayloadType = {
  businessId: BusinessIdType
}
