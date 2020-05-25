// Business
import {
  Business,
  BusinessIdType,
  IBusiness
} from './business';

import BusinessService from './business.service';

interface IPlayer {
  getCapital: () => number,
  hasEnoughMoney: (price: number) => boolean,
  buyBusiness: (businessId: BusinessIdType) => void
  upgradeBusiness(businessId: BusinessIdType): void
  gainCapital: (businessId: BusinessIdType) => void
  isOwnerOfBusiness: (businessId: BusinessIdType) => boolean
}

class Player implements IPlayer {
  private _capital = 0

  private _businessesMap = new Map<BusinessIdType, IBusiness>()

  private _getBusiness(businessId: BusinessIdType) {
    return this._businessesMap.get(businessId);
  }

  private _setBusiness(businessId: BusinessIdType, businessInstance: IBusiness) {
    this._businessesMap.set(businessId, businessInstance);
  }

  private _setCapital(newCapital: number): void {
    this._capital = newCapital;
  }

  private _calculateNewCapital(price: number): number {
    return this.getCapital() - price;
  }

  getCapital(): number {
    return this._capital;
  }

  hasEnoughMoney(price: number): boolean {
    return this.getCapital() >= price;
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
    const newCapital = this._calculateNewCapital(businessConfig.price);

    this._setCapital(newCapital);
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

    const newCapital = this._calculateNewCapital(businessPrice);
    this._setCapital(newCapital);
  }

  gainCapital(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    businessInstance.gainCapital(gainedMoney => {
      this._setCapital(this.getCapital() + gainedMoney);
    });
  }

  isOwnerOfBusiness(businessId: BusinessIdType): boolean {
    return !!this._getBusiness(businessId);
  }
}

export default Player;
