// Game core
import { BusinessIdType, BusinessConfigType } from '@src/game-core';

// Data
import BusinessesData from '../config/businesses-data.json';


class DataBase {
  static getListOfBusinessesConfigs(): Array<BusinessConfigType> {
    return BusinessesData;
  }

  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType | undefined {
    const businessConfig = BusinessesData.find((config) => config.id === businessId);

    return businessConfig;
  }
}

export default DataBase;
