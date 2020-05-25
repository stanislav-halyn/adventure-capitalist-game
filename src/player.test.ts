// Game classes
import Player from './player';

// Business
import {
  Business,
  BusinessService,
  BusinessConfigType
} from './business';


jest.mock('./business');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Player class does the following sections correctly:', () => {
  const businessId = 1;
  const businessConfig: BusinessConfigType = {
    id: businessId,
    price: 50,
    title: 'Lemons',
    priceMultiplier: 0.07,
    gainCapitalDurationMs: 1000
  };


  jest.spyOn(BusinessService, 'getBusinessConfigById').mockImplementation(() => businessConfig);


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
        .toBeCalledWith();

      expect(Player.prototype.getCapital)
        .toBeCalledTimes(2);
    });
  });
});
