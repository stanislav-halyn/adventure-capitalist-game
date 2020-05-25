import { BusinessIdType, BusinessConfigType } from './business';

class DataBase {
  static getListOfBusinessesConfigs(): Array<BusinessConfigType>  {
    return [];
  }

  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType {
    return {
      id: businessId,
      price: 0,
      title: '',
      priceMultiplier: 0.07,
      gainCapitalDurationMs: 1000
    };
  }
}

export default DataBase;
