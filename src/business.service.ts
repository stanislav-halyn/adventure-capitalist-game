import { BusinessIdType, BusinessConfigType } from './business';
import Database from './database';


class BusinessService {
  static getListOfBusinessesConfigs(): Array<BusinessConfigType> {
    return Database.getListOfBusinessesConfigs();
  }

  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType | undefined {
    return Database.getBusinessConfigById(businessId);
  }
}

export default BusinessService;
