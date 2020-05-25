
export type BusinessConfigType = {
  id: BusinessIdType,
  title: string,
  price: number,
  profit: number,
  upgradePriceMultiplier: number,
  gainCapitalDurationMs: number
};

export type BusinessIdType = number;

export interface IBusiness {
  upgrade: () => void;
  getId: () => number;
  getTitle: () => string;
  getIncome: () => number;
  getLevel: () => number;
  getPrice: () => number;
  getGainCapitalDurationMs: () => number;
  isGainingCapital: () => boolean;
  gainCapital: (callback: (earnedMoney: number) => void) => void
}

//TODO: move to utils
const calculateUpgradedPrice = (price: number, upgradePriceMultiplier: number): number => (
  price + price * upgradePriceMultiplier
);

export class Business implements IBusiness {
  private _id:  BusinessIdType;

  private _priceMultiplier: number;
  private _price: number;

  private _title: string;
  private _level: number;

  private _income: number;
  private _initialIncome: number;

  private _gainCapitalDurationMs: number;

  private _gainCapitalTimerId: NodeJS.Timeout | null = null;

  constructor({
    id,
    price,
    title,
    upgradePriceMultiplier,
    gainCapitalDurationMs
  }:BusinessConfigType) {
    this._id = id;

    this._priceMultiplier = upgradePriceMultiplier;
    this._price = calculateUpgradedPrice(price, upgradePriceMultiplier);

    this._title = title;
    this._level = 1;

    this._income = price / 2;
    this._initialIncome = this._income;

    this._gainCapitalDurationMs = gainCapitalDurationMs;
  }

  private _getInitialIncome() {
    return this._initialIncome;
  }

  private _getPriceMultiplier() {
    return this._priceMultiplier;
  }

  private _calculateUpgradedPrice(): number {
    return calculateUpgradedPrice(this.getPrice(), this._getPriceMultiplier());
  }

  private _calculateUpgradedLevel(): number {
    return this.getLevel() + 1;
  }

  private _calculateUpgradedIncome(): number {
    return this.getIncome() + this._getInitialIncome();
  }

  private _setPrice(newPrice: number): void {
    this._price = newPrice;
  }

  private _setLevel(newLevel: number): void {
    this._level = newLevel;
  }

  private _setIncome(newIncome: number): void {
    this._income = newIncome;
  }

  getId(): BusinessIdType {
    return this._id;
  }

  getTitle(): string {
    return this._title;
  }

  getPrice(): number {
    return this._price;
  }

  getLevel(): number {
    return this._level;
  }

  getIncome(): number {
    return this._income;
  }

  getGainCapitalDurationMs(): number {
    return this._gainCapitalDurationMs;
  }

  isGainingCapital(): boolean {
    return !!this._gainCapitalTimerId;
  }

  upgrade(): void {
    const newPrice = this._calculateUpgradedPrice();
    const newLevel = this._calculateUpgradedLevel();
    const newIncome = this._calculateUpgradedIncome();

    this._setPrice(newPrice);
    this._setLevel(newLevel);
    this._setIncome(newIncome);
  }

  gainCapital(callback: (earnedMoney: number) => void): void {
    if (this.isGainingCapital()) {
      return;
    }

    this._gainCapitalTimerId = setTimeout(() => {
      callback(this.getIncome());
      this._gainCapitalTimerId = null;
    }, this.getGainCapitalDurationMs());
  }
}

export class BusinessService {
  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType {
    businessId
    return {
      id: 0,
      price: 0,
      title: '',
      profit: 0,
      upgradePriceMultiplier: 0.07,
      gainCapitalDurationMs: 1000
    };
  }
}
