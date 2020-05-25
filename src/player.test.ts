// Game classes
import Player from './player';

// Business
import {
  Business,
  BusinessConfigType
} from './business';

import BusinessService from './business.service';


jest.mock('./business');


const businessId = 1;
const businessConfig: BusinessConfigType = {
  id: businessId,
  price: 50,
  title: 'Lemons',
  profit: 0,
  upgradePriceMultiplier: 0.07,
  gainCapitalDurationMs: 1000
};


beforeEach(() => {
  BusinessService.getBusinessConfigById = jest.fn(() => businessConfig);
});


afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});


describe('#player.test.ts', () => {
  describe('.buyBusiness()', () => {
    test('should be able to buy a business', () => {
      const playerInstance = new Player();

      const initialCapital = 150;

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => initialCapital)
        .mockImplementationOnce(() => initialCapital);

      playerInstance.buyBusiness(businessId);

      expect(playerInstance.isOwnerOfBusiness(businessId))
        .toBeTruthy();

      expect(playerInstance.capital)
        .toEqual(100);
    });


    test('shouldn\'t be able to buy a business if there\'s not enough capital', () => {
      const playerInstance = new Player();

      const initialCapital = 40;

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => initialCapital)
        .mockImplementationOnce(() => initialCapital);

      playerInstance.buyBusiness(businessId);

      expect(playerInstance.isOwnerOfBusiness(businessId))
        .toBeFalsy();

      expect(playerInstance.capital)
        .toEqual(initialCapital);
    });


    test('calls functions with correct arguments', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get').mockImplementation(() => 150);

      playerInstance.buyBusiness(businessId);

      expect(BusinessService.getBusinessConfigById)
        .toBeCalledWith(businessId);

      expect(Business)
        .toBeCalledTimes(1);

      expect(Business)
        .toBeCalledWith(businessConfig);
    });
  });

  describe('.upgradeBusiness()', () => {
    test('should upgrade business', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 150);

      jest.spyOn(Business.prototype, 'getPrice').mockImplementationOnce(() => 50);

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      playerInstance.buyBusiness(businessId);
      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .toBeCalled();

      expect(playerInstance.capital)
        .toEqual(50);
    });

    test('shouldn\'t upgrade business if there\'s not enough money', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => 50)
        .mockImplementationOnce(() => 50);

      jest.spyOn(Business.prototype, 'getPrice').mockImplementationOnce(() => 50);

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      playerInstance.buyBusiness(businessId);
      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .not.toBeCalled();

      expect(playerInstance.capital)
        .toEqual(0);
    });

    test('shouldn\'t upgrade business if a user doesn\'t own it', () => {
      const playerInstance = new Player();

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .not.toBeCalled();
    });
  });

  describe('.gainCapital()', () => {
    test('should gain money from a business', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 150);

      jest.spyOn(Business.prototype, 'getPrice').mockImplementationOnce(() => 50);

      const gainCapitaSpy = jest.spyOn(Business.prototype, 'gainCapital');
      gainCapitaSpy.mockImplementation(cb => cb(10));

      playerInstance.buyBusiness(businessId);

      expect(playerInstance.capital)
        .toEqual(100);

      playerInstance.gainCapital(businessId);

      expect(gainCapitaSpy)
        .toBeCalled();

      expect(gainCapitaSpy)
        .toBeCalledWith(expect.any(Function));

      expect(playerInstance.capital)
        .toEqual(110);
    });

    test('shouldn\'t gain money from a business if a user doesn\'t own it', () => {
      const gainCapitaSpy = jest.spyOn(Business.prototype, 'gainCapital');

      const playerInstance = new Player();

      playerInstance.gainCapital(businessId);

      expect(gainCapitaSpy)
        .not.toBeCalled();
    });
  });
});
