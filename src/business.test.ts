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


describe('Business class does the following sections correctly', () => {
  const initialBusinessConfig: BusinessConfigType = {
    id: 0,
    price: 4,
    title: 'Lemons',
    profit: 0,
    upgradePriceMultiplier: 0.07,
    gainCapitalDurationMs: 1000
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

  test('business takes some time to gain the capital', () => {
    jest.useFakeTimers();

    const businessInstance = new Business(initialBusinessConfig);
    const callback = jest.fn();

    businessInstance.gainCapital(callback);

    expect(setTimeout)
      .toBeCalledTimes(1);

    expect(setTimeout)
      .toBeCalledWith(expect.any(Function), businessInstance.getGainCapitalDurationMs());
  });

  test('business doesn\'t re-start gaining capital if it\'s already in progress', () => {
    jest.useFakeTimers();

    jest.spyOn(Business.prototype, 'isGainingCapital').mockImplementation(() => true);

    const businessInstance = new Business(initialBusinessConfig);
    const callback = jest.fn();

    businessInstance.gainCapital(callback);

    expect(setTimeout)
      .not.toBeCalled();
  });

  test('business passes earned money amount to the callback', () => {
    const businessInstance = new Business(initialBusinessConfig);
    const callback = jest.fn();

    businessInstance.gainCapital(callback);

    expect(callback)
      .not.toBeCalled();

    jest.advanceTimersByTime(businessInstance.getGainCapitalDurationMs());

    expect(callback)
      .toBeCalled();

    expect(callback)
      .toBeCalledWith(businessInstance.getIncome());
  });
});
