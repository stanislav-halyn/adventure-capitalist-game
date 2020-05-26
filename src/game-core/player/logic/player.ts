// Entities
import {
  Business,
  BusinessService,
  IBusiness,
  BusinessIdType
} from '../../business';

// Typings
import { IPlayer } from '../typings';


class Player implements IPlayer {
  private _capital = 100

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

    if (!this.hasEnoughMoney(businessInstance.price)) {
      console.log('There\'s not enough money to upgrade this business');
      return;
    }

    this._spendMoney(businessInstance.price);

    businessInstance.upgrade();
  }

  gainCapital(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    businessInstance.gainCapital(gainedMoney => {
      this._earnMoney(gainedMoney);
      console.log('earned');
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
