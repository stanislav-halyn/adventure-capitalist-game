// Service
import BusinessService from './business.service';

// Database
import Database from './database';

// Business
import { BusinessConfigType } from './business';


jest.mock('./database');

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
})

describe('#business.service.test.ts', () => {
  const businessId = 0;

  const dbBusinessConfig: BusinessConfigType = {
    id: businessId,
    price: 0,
    title: '',
    priceMultiplier: 0.07,
    gainCapitalDurationMs: 1000
  }


  test('returns a list of all businesses configs', () => {
    const dbBusinessesConfigs = [dbBusinessConfig, dbBusinessConfig];

    jest.spyOn(Database, 'getListOfBusinessesConfigs')
      .mockImplementation(() => dbBusinessesConfigs);

    const businessesConfigsList = BusinessService.getListOfBusinessesConfigs();

    expect(businessesConfigsList)
      .toBeInstanceOf(Array);

    expect(businessesConfigsList)
      .toHaveLength(2);
  });

  test('return a business config by its id', () => {
    jest.spyOn(Database, 'getBusinessConfigById').mockImplementation(() => dbBusinessConfig);

    const businessConfig = BusinessService.getBusinessConfigById(businessId);

    expect(businessConfig)
      .toEqual(dbBusinessConfig);
  });
});
