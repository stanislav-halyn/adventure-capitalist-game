// Business class
import {
  Business,
  BusinessConfigType
} from './business';

describe('Business class does the following sections correctly', () => {
  const initialBusinessConfig: BusinessConfigType = {
    id: 0,
    price: 4,
    title: 'Lemons',
    priceMultiplier: 0.07
  };

  test('business is initialized with correct values', () => {
    const businessInstance = new Business(initialBusinessConfig);

    expect(businessInstance.getId())
      .toEqual(0);

    expect(businessInstance.getLevel())
      .toEqual(1);

    expect(businessInstance.getTitle())
      .toEqual('Lemons');

    expect(businessInstance.getIncome())
      .toEqual(2);

    expect(businessInstance.getPrice())
      .toBeCloseTo(4.28);
  });


  test('business is upgraded correctly', () => {
    const businessInstance = new Business(initialBusinessConfig);
    businessInstance.upgrade();

    expect(businessInstance.getIncome())
      .toEqual(4);

    expect(businessInstance.getLevel())
      .toEqual(2);

    expect(businessInstance.getPrice())
      .toBeCloseTo(4.58);

    businessInstance.upgrade();

    expect(businessInstance.getIncome())
    .toEqual(6);

    expect(businessInstance.getLevel())
      .toEqual(3);

    expect(businessInstance.getPrice())
      .toBeCloseTo(4.90);
  });
});
