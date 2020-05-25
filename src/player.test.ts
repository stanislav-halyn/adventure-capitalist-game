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


describe('Player class does the following sections correctly:', () => {
  describe('process of buying a business', () => {
    test('can buy a business if there\'s enough money', () => {
      const initialCapital = 150;

      jest.spyOn(Player.prototype, 'getCapital')
        .mockImplementationOnce(() => initialCapital)
        .mockImplementationOnce(() => initialCapital);

      const playerInstance = new Player();
      playerInstance.buyBusiness(businessId);

      expect(playerInstance.isOwnerOfBusiness(businessId))
        .toBeTruthy();

      expect(playerInstance.getCapital())
        .toEqual(100);
    });


    test('cannot buy a business if there\'s not enough capital', () => {
      const initialCapital = 40;

      jest.spyOn(Player.prototype, 'getCapital')
        .mockImplementationOnce(() => initialCapital)
        .mockImplementationOnce(() => initialCapital);

      const playerInstance = new Player();
      playerInstance.buyBusiness(businessId);

      expect(playerInstance.isOwnerOfBusiness(businessId))
        .toBeFalsy();

      expect(playerInstance.getCapital())
        .toEqual(initialCapital);
    });


    test('calls functions with correct arguments', () => {
      jest.spyOn(Player.prototype, 'getCapital').mockImplementation(() => 150);

      const playerInstance = new Player();
      playerInstance.buyBusiness(businessId);

      expect(BusinessService.getBusinessConfigById)
        .toBeCalledWith(businessId);

      expect(Business)
        .toBeCalledTimes(1);

      expect(Business)
        .toBeCalledWith(businessConfig);

      expect(Player.prototype.getCapital)
        .toBeCalledTimes(2);
    });
  });

  describe('process of upgrading a business', () => {
    test('can upgrade business if there\'s enough money', () => {
      jest.spyOn(Player.prototype, 'getCapital')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 150);

      jest.spyOn(Business.prototype, 'getPrice').mockImplementationOnce(() => 50);

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      const playerInstance = new Player();

      playerInstance.buyBusiness(businessId);
      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .toBeCalled();

      expect(playerInstance.getCapital())
        .toEqual(50);
    });

    test('cannot upgrade business if there\'s not enough money', () => {
      jest.spyOn(Player.prototype, 'getCapital')
        .mockImplementationOnce(() => 50)
        .mockImplementationOnce(() => 50);

      jest.spyOn(Business.prototype, 'getPrice').mockImplementationOnce(() => 50);

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      const playerInstance = new Player();

      playerInstance.buyBusiness(businessId);
      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .not.toBeCalled();
    });

    test('cannot upgrade business if a user doesn\'t own it', () => {
      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      const playerInstance = new Player();

      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .not.toBeCalled();
    });
  });
});
