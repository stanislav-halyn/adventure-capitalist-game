// Business
import {
  Business,
  BusinessIdType,
  IBusiness
} from './business';

import BusinessService from './business.service';

interface IPlayer {
  capital: number
  hasEnoughMoney: (price: number) => boolean
  isOwnerOfBusiness: (businessId: BusinessIdType) => boolean
  buyBusiness: (businessId: BusinessIdType) => void
  upgradeBusiness(businessId: BusinessIdType): void
  gainCapital: (businessId: BusinessIdType) => void
}

class Player implements IPlayer {
  private _capital = 0

  private _businessesMap = new Map<BusinessIdType, IBusiness>()

  get capital(): number {
    return this._capital;
  }

  hasEnoughMoney(price: number): boolean {
    return this.capital >= price;
  }

  isOwnerOfBusiness(businessId: BusinessIdType): boolean {
    return !!this._getBusiness(businessId);
  }

  buyBusiness(businessId: BusinessIdType): void {
    const businessConfig = BusinessService.getBusinessConfigById(businessId);

    if (!businessConfig) {
      console.log('Business with this id doesn\'t exist');
      return;
    }

    if (!this.hasEnoughMoney(businessConfig.price)) {
      console.log('There\'s not enough money to buy this business');
      return;
    }

    const businessInstance = new Business(businessConfig);

    this._spendMoney(businessConfig.price);
    this._setBusiness(businessConfig.id, businessInstance);
  }

  upgradeBusiness(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    const businessPrice = businessInstance.getPrice();

    if (!this.hasEnoughMoney(businessPrice)) {
      console.log('There\'s not enough money to upgrade this business');
      return;
    }

    businessInstance.upgrade();

    this._spendMoney(businessPrice);
  }

  gainCapital(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    businessInstance.gainCapital(gainedMoney => {
      this._earnMoney(gainedMoney)
    });
  }

  private _getBusiness(businessId: BusinessIdType) {
    return this._businessesMap.get(businessId);
  }

  private _setBusiness(businessId: BusinessIdType, businessInstance: IBusiness) {
    this._businessesMap.set(businessId, businessInstance);
  }

  private _spendMoney(sum: number): void {
    this._capital = this.capital - sum;
  }

  private _earnMoney(sum: number): void {
    this._capital = this.capital + sum;
  }
}

export default Player;
