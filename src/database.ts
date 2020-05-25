import { BusinessIdType, BusinessConfigType } from './business';

import BusinessesConfigs from './businesses-configs.json';

class DataBase {
  static getListOfBusinessesConfigs(): Array<BusinessConfigType>  {
    return BusinessesConfigs;
  }

  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType | undefined {
    const businessConfig = BusinessesConfigs.find(config => config.id === businessId);

    return businessConfig;
  }
}

export default DataBase;
