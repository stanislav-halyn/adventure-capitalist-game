// Modules
import { EventEmitter } from 'events';

// Entities
import {
  Business,
  BusinessService,
  IBusiness,
  BusinessIdType
} from '../../business';

// Typings
import { IPlayer, PlayerBusinessType } from '../typings';

// Constants
import { PlayerEventNames } from '../constants';

// Utils
import { formatBusiness } from '../utils/player-format.utils';


class Player implements IPlayer {
  private _capital = 100

  private _businessesMap = new Map<BusinessIdType, IBusiness>()

  private _eventEmitter = new EventEmitter();

  get capital(): number {
    return this._capital;
  }

  addEventListener(eventName: PlayerEventNames, handler: () => void): void {
    this._eventEmitter.on(eventName, handler);
  }

  getAllBusinessesList(): Array<PlayerBusinessType> {
    const businessesConfigs = BusinessService.getListOfBusinessesConfigs();

    const result = businessesConfigs.map(config => (
      formatBusiness({
        business: config,
        isBought: this.isOwnerOfBusiness(config.id)
      })
    ));

    return result;
  }

  getMyBusinessesList(): Array<PlayerBusinessType> {
    const businesses = Array.from(this._businessesMap.values());

    const result = businesses.map(businessInstance => (
      formatBusiness({
        business: businessInstance,
        isBought: this.isOwnerOfBusiness(businessInstance.id)
      })
    ));

    return result;
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
    this._eventEmitter.emit(PlayerEventNames.BUY_BUSINESS);
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
    this._eventEmitter.emit(PlayerEventNames.UPGRADE_BUSINESS);
  }

  gainCapital(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    businessInstance.gainCapital(gainedMoney => {
      this._earnMoney(gainedMoney);

      setImmediate(() => this._eventEmitter.emit(PlayerEventNames.GAIN_CAPITAL));
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
