// Modules
import { EventEmitter } from 'events';

// Game classes
import Player from './player';

// Entities
import {
  Business,
  BusinessService,
  BusinessConfigType
} from '../../business';

// Constants
import { PlayerEventNames } from '../constants';

// Utils
import { formatBusinessConfig } from '../utils/player-format.utils';


jest.mock('events');


jest.mock('../../business', () => {
  const { Business } = jest.requireActual('../../business');

  return {
    Business,
    BusinessService: jest.fn()
  };
});


jest.mock('../utils/player-format.utils');


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
  jest.useFakeTimers();

  BusinessService.getBusinessConfigById = jest.fn(() => businessConfig);
});


afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});


describe('#player.test.ts', () => {
  const EventEmitterSpy = jest.spyOn(EventEmitter.prototype, 'emit');


  test('.addEventListener()', () => {
    const addEventListenerSpy = jest.spyOn(EventEmitter.prototype, 'on');

    const playerInstance = new Player();
    const handler = () => 1;

    playerInstance.addEventListener(PlayerEventNames.BUY_BUSINESS, handler);

    expect(addEventListenerSpy)
      .toBeCalledWith(PlayerEventNames.BUY_BUSINESS, handler);
  });


  test('.getAllBusinessesList()', () => {
    BusinessService.getListOfBusinessesConfigs = jest.fn(() => [businessConfig]);

    const playerInstance = new Player();

    const businessesList = playerInstance.getAllBusinessesList();

    expect(businessesList)
      .toBeInstanceOf(Array);

    expect(businessesList)
      .toHaveLength(1);

    expect(formatBusinessConfig)
      .toBeCalledTimes(1);

    expect(formatBusinessConfig)
      .toHaveBeenNthCalledWith(1, businessConfig);
  });


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

      expect(EventEmitterSpy)
        .toBeCalledWith(PlayerEventNames.BUY_BUSINESS);
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

      expect(EventEmitterSpy)
        .not.toBeCalledWith(PlayerEventNames.BUY_BUSINESS);
    });


    test('calls functions with correct arguments', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get').mockImplementation(() => 150);

      playerInstance.buyBusiness(businessId);

      expect(BusinessService.getBusinessConfigById)
        .toBeCalledWith(businessId);

      // TODO: find a way to mock the `Business` class
      // here and un-mock it in `.upgradeBusiness()` section

      // expect(Business)
      //   .toBeCalledTimes(1);

      // expect(Business)
      //   .toBeCalledWith(businessConfig);
    });
  });

  describe('.upgradeBusiness()', () => {
    test('should upgrade business', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 150);

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      playerInstance.buyBusiness(businessId);

      expect(playerInstance.capital)
        .toEqual(100);

      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .toBeCalled();

      expect(playerInstance.capital)
        .toEqual(46.5);

      expect(EventEmitterSpy)
        .toBeCalledWith(PlayerEventNames.UPGRADE_BUSINESS);
    });

    test('shouldn\'t upgrade business if there\'s not enough money', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => 50)
        .mockImplementationOnce(() => 50);

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      playerInstance.buyBusiness(businessId);

      expect(playerInstance.capital)
        .toEqual(0);

      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .not.toBeCalled();

      expect(playerInstance.capital)
        .toEqual(0);

      expect(EventEmitterSpy)
        .not.toBeCalledWith(PlayerEventNames.UPGRADE_BUSINESS);
    });

    test('shouldn\'t upgrade business if a user doesn\'t own it', () => {
      const playerInstance = new Player();

      const upgradeBusinessSpy = jest.spyOn(Business.prototype, 'upgrade');

      playerInstance.upgradeBusiness(businessId);

      expect(upgradeBusinessSpy)
        .not.toBeCalled();

      expect(EventEmitterSpy)
        .not.toBeCalledWith(PlayerEventNames.UPGRADE_BUSINESS);
    });
  });

  describe('.gainCapital()', () => {
    test('should gain money from a business', () => {
      const playerInstance = new Player();

      jest.spyOn(playerInstance, 'capital', 'get')
        .mockImplementationOnce(() => 150)
        .mockImplementationOnce(() => 150);

      const gainCapitaSpy = jest.spyOn(Business.prototype, 'gainCapital');
      gainCapitaSpy.mockImplementation(cb => cb(10));

      playerInstance.buyBusiness(businessId);

      expect(playerInstance.capital)
        .toEqual(100);

      playerInstance.gainCapital(businessId);

      // execute setImmediate
      jest.runAllTimers();

      expect(gainCapitaSpy)
        .toBeCalled();

      expect(gainCapitaSpy)
        .toBeCalledWith(expect.any(Function));

      expect(playerInstance.capital)
        .toEqual(110);

      expect(EventEmitterSpy)
        .toBeCalledWith(PlayerEventNames.GAIN_CAPITAL);
    });

    test('shouldn\'t gain money from a business if a user doesn\'t own it', () => {
      const gainCapitaSpy = jest.spyOn(Business.prototype, 'gainCapital');

      const playerInstance = new Player();

      playerInstance.gainCapital(businessId);

      // execute setImmediate
      jest.runAllTimers();

      expect(gainCapitaSpy)
        .not.toBeCalled();

      expect(EventEmitterSpy)
        .not.toBeCalledWith(PlayerEventNames.GAIN_CAPITAL);
    });
  });
});
