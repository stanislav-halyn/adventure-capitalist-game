// Business
import {
  Business,
  BusinessService,
  BusinessIdType,
  IBusiness
} from './business';

interface IPlayer {
  getCapital: () => number,
  hasEnoughMoney: (price: number) => boolean,
  buyBusiness: (businessId: BusinessIdType) => void
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

    if (!this.hasEnoughMoney(businessConfig.price)) {
      console.log('There\'s not enough money to buy this business');
      return;
    }

    const businessInstance = new Business();
    const newCapital = this._calculateNewCapital(businessConfig.price);

    this._setCapital(newCapital);
    this._setBusiness(businessConfig.id, businessInstance);
  }

  isOwnerOfBusiness(businessId: BusinessIdType): boolean {
    return !!this._getBusiness(businessId);
  }
}

export default Player;
