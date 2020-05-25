// Database
import Database from './database';


jest.mock('./businesses-configs.json', () => ([{
  id: 0,
  price: 4,
  title: 'Lemons',
  upgradePriceMultiplier: 0.07,
  gainCapitalDurationMs: 1000
}]), { virtual: true });


describe('#database.test.ts', () => {
  test('.getListOfBusinessesConfigs()', () => {
    const businessesConfigs = Database.getListOfBusinessesConfigs();

    expect(businessesConfigs)
      .toBeInstanceOf(Array);

      expect(businessesConfigs)
      .toHaveLength(1);
  });


  describe('.getBusinessConfigById()', () => {
    test('should return a business config by its id', () => {
      const businessConfig = Database.getBusinessConfigById(0);

      expect(businessConfig?.id)
        .toEqual(0);
    });

    test('should return undefined if the business config not found', () => {
      const nonExistingId = 9999;

      const businessConfig = Database.getBusinessConfigById(nonExistingId);

      expect(businessConfig)
        .toBeUndefined();
    });
  });
});
