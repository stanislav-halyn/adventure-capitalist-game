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
import {
  formatBusiness,
  formatPlayerBusinessEventPayload
} from '../utils/player-format.utils';


class Player implements IPlayer {
  private _capital = 100

  private _businessesMap = new Map<BusinessIdType, IBusiness>()

  private _managersMap = new Map<BusinessIdType, boolean>()

  private _eventEmitter = new EventEmitter();


  get capital(): number {
    return this._capital;
  }


  addEventListener<T>(eventName: PlayerEventNames, handler: (args: T) => void): void {
    this._eventEmitter.on(eventName, handler);
  }


  getAllBusinessesList(): Array<PlayerBusinessType> {
    const businessesConfigs = BusinessService.getListOfBusinessesConfigs();

    const result = businessesConfigs.map(config => (
      formatBusiness({
        business: this._getBusiness(config.id) || config,
        isManaged: this.isBusinessManaged(config.id),
        isBought: this.isOwnerOfBusiness(config.id)
      })
    ));

    return result;
  }


  getBusinessById(businessId: BusinessIdType): PlayerBusinessType | undefined {
    const businessConfig = BusinessService.getBusinessConfigById(businessId);

    if (!businessConfig) {
      console.log(`Business with id: ${businessConfig} doesn\'t exist`);
      return;
    }

    const result = formatBusiness({
      business: this._getBusiness(businessId) || businessConfig,
      isManaged: this.isBusinessManaged(businessId),
      isBought: this.isOwnerOfBusiness(businessId)
    })

    return result;
  }


  hasEnoughMoney(price: number): boolean {
    return this.capital >= price;
  }


  isOwnerOfBusiness(businessId: BusinessIdType): boolean {
    return !!this._getBusiness(businessId);
  }


  isBusinessManaged(businessId: BusinessIdType): boolean {
    return !!this._getManager(businessId);
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

    if (this.isOwnerOfBusiness(businessId)) {
      console.log('You already own this business');
      return;
    }

    const businessInstance = new Business(businessConfig);

    this._spendMoney(businessConfig.price);
    this._setBusiness(businessConfig.id, businessInstance);
    this._emitPlayerBusinessEvent(PlayerEventNames.BUY_BUSINESS, businessId);
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
    this._emitPlayerBusinessEvent(PlayerEventNames.UPGRADE_BUSINESS, businessId);
  }


  gainCapital(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    businessInstance.gainCapital(this._handleGainCapitalComplete(businessId));

    this._emitPlayerBusinessEvent(PlayerEventNames.START_GAIN_CAPITAL, businessId);
  }


  hireManager(businessId: BusinessIdType): void {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      console.log('You don\'t own this business');
      return;
    }

    if (this.isBusinessManaged(businessId)) {
      console.log('You already have a manager for this business');
      return;
    }

    if (!this.hasEnoughMoney(businessInstance.managerPrice)) {
      console.log('There\'s not enough money to buy a manager for this business');
      return;
    }

    this._setManager(businessId);
    this._spendMoney(businessInstance.managerPrice);
    this.gainCapital(businessId);
  }


  private _handleGainCapitalComplete = (businessId: BusinessIdType) => (gainedMoney: number) => {
    this._earnMoney(gainedMoney);

    setImmediate(() => {
      this._emitPlayerBusinessEvent(PlayerEventNames.GAIN_CAPITAL, businessId);

      this.isBusinessManaged(businessId) && this.gainCapital(businessId);
    });
  }

  private _emitPlayerBusinessEvent(eventName: PlayerEventNames, businessId: BusinessIdType) {
    const eventPayload = formatPlayerBusinessEventPayload(businessId);

    this._eventEmitter.emit(eventName, eventPayload);
  }


  private _getBusiness(businessId: BusinessIdType) {
    return this._businessesMap.get(businessId);
  }


  private _setBusiness(businessId: BusinessIdType, businessInstance: IBusiness) {
    this._businessesMap.set(businessId, businessInstance);
  }


  private _getManager(businessId: BusinessIdType) {
    return this._managersMap.get(businessId);
  }


  private _setManager(businessId: BusinessIdType) {
    this._managersMap.set(businessId, true);
  }


  private _spendMoney(sum: number): void {
    this._capital = this.capital - sum;
  }


  private _earnMoney(sum: number): void {
    this._capital = this.capital + sum;
  }
}

export default Player;
