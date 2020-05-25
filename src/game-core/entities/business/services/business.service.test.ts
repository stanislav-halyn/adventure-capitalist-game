// Service
import BusinessService from './business.service';

// Database
import { Database } from '@src/database';

// Typings
import { BusinessConfigType } from '../typings';


jest.mock('@src/database');


beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
})

describe('#business.service.test.ts', () => {
  const businessId = 0;

  const dbBusinessConfig: BusinessConfigType = {
    id: businessId,
    price: 0,
    profit: 0,
    title: '',
    upgradePriceMultiplier: 0.07,
    gainCapitalDurationMs: 1000
  }


  test('.getListOfBusinessesConfigs()', () => {
    const dbBusinessesConfigs = [dbBusinessConfig, dbBusinessConfig];

    jest.spyOn(Database, 'getListOfBusinessesConfigs')
      .mockImplementation(() => dbBusinessesConfigs);

    const businessesConfigsList = BusinessService.getListOfBusinessesConfigs();

    expect(businessesConfigsList)
      .toBeInstanceOf(Array);

    expect(businessesConfigsList)
      .toHaveLength(2);
  });

  test('.getBusinessConfigById()', () => {
    jest.spyOn(Database, 'getBusinessConfigById').mockImplementation(() => dbBusinessConfig);

    const businessConfig = BusinessService.getBusinessConfigById(businessId);

    expect(businessConfig)
      .toEqual(dbBusinessConfig);
  });
});
