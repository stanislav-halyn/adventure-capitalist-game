
export type BusinessIdType = number;

export type BusinessConfigType = {
  id: BusinessIdType,
  title: string,
  price: number,
  profit: number,
  upgradePriceMultiplier: number,
  gainCapitalDurationMs: number
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
