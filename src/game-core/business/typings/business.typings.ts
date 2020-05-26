
export type BusinessIdType = number;

export type BusinessType = {
  id: BusinessIdType,
  title: string,
  price: number,
  profit: number,
  gainCapitalDurationMs: number
};

export type BusinessConfigType = BusinessType & {
  upgradePriceMultiplier: number,
};

export interface IBusiness {
  id: BusinessIdType
  title: string
  profit: number
  level: number
  price: number
  gainCapitalDurationMs: number
  isGainingCapital: boolean
  upgrade: () => void
  gainCapital: (callback: (gainedMoney: number) => void) => void
}
