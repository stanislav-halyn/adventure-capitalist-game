
export const calculateUpgradedPrice = (price: number, upgradePriceMultiplier: number): number => (
  price + price * upgradePriceMultiplier
);
