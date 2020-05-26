// Typings
import {
  IBusiness,
  BusinessIdType,
  BusinessConfigType
} from '../typings';

// Utils
import { calculateUpgradedPrice } from '../utils/business.utils';


class Business implements IBusiness {
  private _id:  BusinessIdType;

  private _priceMultiplier: number;
  private _price: number;

  private _title: string;
  private _level: number;

  private _profit: number;
  private _initialProfit: number;

  private _gainCapitalDurationMs: number;

  private _gainCapitalTimerId: NodeJS.Timeout | null = null;

  constructor({
    id,
    title,
    price,
    profit,
    upgradePriceMultiplier,
    gainCapitalDurationMs
  }: BusinessConfigType) {
    this._id = id;

    this._priceMultiplier = upgradePriceMultiplier;
    this._price = calculateUpgradedPrice(price, upgradePriceMultiplier);

    this._title = title;
    this._level = 1;

    this._profit = profit;
    this._initialProfit = profit;

    this._gainCapitalDurationMs = gainCapitalDurationMs;
  }

  get id(): BusinessIdType {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get price(): number {
    return this._price;
  }

  get level(): number {
    return this._level;
  }

  get profit(): number {
    return this._profit;
  }

  get gainCapitalDurationMs(): number {
    return this._gainCapitalDurationMs;
  }

  get isGainingCapital(): boolean {
    return !!this._gainCapitalTimerId;
  }

  upgrade(): void {
    this._upgradePrice();
    this._upgradeLevel();
    this._upgradeProfit();
  }

  gainCapital(callback: (gainedMoney: number) => void): void {
    if (this.isGainingCapital) {
      console.log('The business is already gaining the capital');
      return;
    }

    this._gainCapitalTimerId = setTimeout(() => {
      callback(this.profit);

      this._gainCapitalTimerId = null;
    }, this._gainCapitalDurationMs);
  }

  private _upgradePrice(): void {
    this._price = calculateUpgradedPrice(this.price, this._priceMultiplier);
  }

  private _upgradeLevel(): void {
    this._level = this.level + 1;
  }

  private _upgradeProfit(): void {
    this._profit = this.profit + this._initialProfit;
  }
}

export default Business;
