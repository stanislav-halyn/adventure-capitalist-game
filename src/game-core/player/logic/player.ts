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
import { IPlayer, PlayerIdType, PlayerBusinessType } from '../typings';

// Constants
import { PlayerEventNames } from '../constants/player.constants';
import { PlayerErrorMessages } from '../constants/error.constants';

// Utils
import {
  formatBusiness,
  formatPlayerBusinessEventPayload
} from '../utils/player-format.utils';


class Player implements IPlayer {
  private _id: PlayerIdType;

  private _capital: number;

  private _businessesMap = new Map<BusinessIdType, IBusiness>()

  private _managersMap = new Map<BusinessIdType, boolean>()

  private _eventEmitter = new EventEmitter();


  constructor(id: PlayerIdType, initialCapital?: number) {
    this._id = id;

    this._capital = initialCapital || 100;
  }


  get id(): PlayerIdType {
    return this._id;
  }

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
    return this._safeAction<PlayerBusinessType>(() => (
      this._getBusinessById(businessId)
    ));
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
    this._safeAction(() => {
      this._buyBusiness(businessId);
    });
  }


  upgradeBusiness(businessId: BusinessIdType): void {
    this._safeAction(() => {
      this._upgradeBusiness(businessId);
    });
  }


  gainCapital(businessId: BusinessIdType): void {
    this._safeAction(() => {
      this._gainCapital(businessId);
    });
  }


  hireManager(businessId: BusinessIdType): void {
    this._safeAction(() => {
      this._hireManager(businessId);
    })
  }

  private _safeAction<T>(action: () => T): T | undefined {
    try {
      const result = action();

      return result;
    } catch (err) {
      this._eventEmitter.emit(PlayerEventNames.ERROR, err.toString());

      return;
    }
  }

  private _getBusinessById(businessId: BusinessIdType): PlayerBusinessType {
    const businessConfig = this._getBusinessConfigSave(businessId);

    const result = formatBusiness({
      business: this._getBusiness(businessId) || businessConfig,
      isManaged: this.isBusinessManaged(businessId),
      isBought: this.isOwnerOfBusiness(businessId)
    })

    return result;
  }


  private _buyBusiness(businessId: BusinessIdType): void {
    const businessConfig = this._getBusinessConfigSave(businessId);

    this._checkEnoughMoney(businessConfig.price);
    this._checkNotOwnBusiness(businessId);

    const businessInstance = new Business(businessConfig);

    this._spendMoney(businessConfig.price);
    this._setBusiness(businessConfig.id, businessInstance);
    this._emitPlayerBusinessEvent(PlayerEventNames.BUY_BUSINESS, businessId);
  }


  private _upgradeBusiness(businessId: BusinessIdType): void {
    const businessInstance = this._getBusinessInstanceSafe(businessId);

    this._checkEnoughMoney(businessInstance.price);

    this._spendMoney(businessInstance.price);

    businessInstance.upgrade();
    this._emitPlayerBusinessEvent(PlayerEventNames.UPGRADE_BUSINESS, businessId);
  }


  private _gainCapital(businessId: BusinessIdType): void {
    const businessInstance = this._getBusinessInstanceSafe(businessId);

    businessInstance.gainCapital(this._handleGainCapitalComplete(businessId));

    this._emitPlayerBusinessEvent(PlayerEventNames.START_GAIN_CAPITAL, businessId);
  }


  private _hireManager(businessId: BusinessIdType): void {
    const businessInstance = this._getBusinessInstanceSafe(businessId);

    this._checkIsBusinessNotManaged(businessId);
    this._checkEnoughMoney(businessInstance.managerPrice);

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

  private _getBusinessConfigSave(businessId: BusinessIdType) {
    const businessConfig = BusinessService.getBusinessConfigById(businessId);

    if (!businessConfig) {
      throw new Error(PlayerErrorMessages.BUSINESS_DOESNT_EXIST);
    } else {
      return businessConfig;
    }
  }

  private _getBusinessInstanceSafe(businessId: BusinessIdType): IBusiness {
    const businessInstance = this._getBusiness(businessId);

    if (!businessInstance) {
      throw new Error(PlayerErrorMessages.YOU_DONT_OWN_BUSINESS);
    } else {
      return businessInstance;
    }
  }


  private _checkEnoughMoney(price: number) {
    if (!this.hasEnoughMoney(price)) {
      throw new Error(PlayerErrorMessages.NOT_ENOUGH_MONEY);
    }
  }


  private _checkIsBusinessNotManaged(businessId: BusinessIdType) {
    if (this.isBusinessManaged(businessId)) {
      throw new Error(PlayerErrorMessages.YOU_ALREADY_HAVE_MANAGER);
    }
  }


  private _checkNotOwnBusiness(businessId: BusinessIdType) {
    if (this.isOwnerOfBusiness(businessId)) {
      throw new Error(PlayerErrorMessages.YOU_ALREADY_OWN_BUSINESS);
    }
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
