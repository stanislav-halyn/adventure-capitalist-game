
export const calculateUpgradedPrice = (price: number, upgradePriceMultiplier: number): number => {
  const result = price + price * upgradePriceMultiplier;

  return +result.toFixed(2);
};
