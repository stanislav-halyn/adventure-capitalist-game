
export type BusinessConfigType = {
  id: BusinessIdType,
  price: number
  title: string,
  priceMultiplier: number
};

export type BusinessIdType = number;

export interface IBusiness {
  upgrade: () => void,
  getId: () => number,
  getTitle: () => string,
  getIncome: () => number,
  getLevel: () => number
  getPrice: () => number
}

//TODO: move to utils
const calculateUpgradedPrice = (price: number, priceMultiplier: number): number => (
  price + price * priceMultiplier
);

export class Business implements IBusiness {
  private _id:  BusinessIdType;

  private _priceMultiplier: number;
  private _price: number;

  private _title: string;
  private _level: number;

  private _income: number;
  private _initialIncome: number;

  constructor({
    id,
    price,
    title,
    priceMultiplier
  }:BusinessConfigType) {
    this._id = id;

    this._priceMultiplier = priceMultiplier;
    this._price = calculateUpgradedPrice(price, priceMultiplier);

    this._title = title;
    this._level = 1;

    this._income = price / 2;
    this._initialIncome = this._income;
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

  upgrade(): void {
    const newPrice = this._calculateUpgradedPrice();
    const newLevel = this._calculateUpgradedLevel();
    const newIncome = this._calculateUpgradedIncome();

    this._setPrice(newPrice);
    this._setLevel(newLevel);
    this._setIncome(newIncome);
  }
}

export class BusinessService {
  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType {
    businessId
    return {
      id: 0,
      price: 0,
      title: '',
      priceMultiplier: 0.07
    };
  }
}
