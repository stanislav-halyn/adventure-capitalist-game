// Business class
import {
  Business,
  BusinessConfigType
} from './business';


beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
  jest.restoreAllMocks();
});


describe('business.test.ts', () => {
  const initialBusinessConfig: BusinessConfigType = {
    id: 0,
    price: 4,
    title: 'Lemons',
    profit: 2,
    upgradePriceMultiplier: 0.07,
    gainCapitalDurationMs: 1000
  };


  test('.constructor()', () => {
    const businessInstance = new Business(initialBusinessConfig);

    expect(businessInstance.id)
      .toEqual(0);

    expect(businessInstance.level)
      .toEqual(1);

    expect(businessInstance.title)
      .toEqual('Lemons');

    expect(businessInstance.profit)
      .toEqual(2);

    expect(businessInstance.price)
      .toBeCloseTo(4.28);
  });


  test('.upgrade()', () => {
    const businessInstance = new Business(initialBusinessConfig);
    businessInstance.upgrade();

    expect(businessInstance.profit)
      .toEqual(4);

    expect(businessInstance.level)
      .toEqual(2);

    expect(businessInstance.price)
      .toBeCloseTo(4.58);

    businessInstance.upgrade();

    expect(businessInstance.profit)
    .toEqual(6);

    expect(businessInstance.level)
      .toEqual(3);

    expect(businessInstance.price)
      .toBeCloseTo(4.90);
  });


  describe('.gainCapital()', () => {
    test('should take some time to gain the capital', () => {
      jest.useFakeTimers();

      const businessInstance = new Business(initialBusinessConfig);
      const callback = jest.fn();

      businessInstance.gainCapital(callback);

      expect(setTimeout)
        .toBeCalledTimes(1);

      expect(setTimeout)
        .toBeCalledWith(expect.any(Function), businessInstance.gainCapitalDurationMs);
    });


    test('shouldn\'t re-start gaining capital if it\'s already in progress', () => {
      jest.useFakeTimers();

      const businessInstance = new Business(initialBusinessConfig);

      jest.spyOn(businessInstance, 'isGainingCapital', 'get').mockImplementation(() => true);

      const callback = jest.fn();

      businessInstance.gainCapital(callback);

      expect(setTimeout)
        .not.toBeCalled();
    });


    test('should pass gained money amount to the callback', () => {
      const businessInstance = new Business(initialBusinessConfig);
      const callback = jest.fn();

      businessInstance.gainCapital(callback);

      expect(callback)
        .not.toBeCalled();

      jest.advanceTimersByTime(businessInstance.gainCapitalDurationMs);

      expect(callback)
        .toBeCalled();

      expect(callback)
        .toBeCalledWith(businessInstance.profit);
    });
  });
});
