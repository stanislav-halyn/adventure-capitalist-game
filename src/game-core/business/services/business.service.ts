// Typings
import { BusinessIdType, BusinessConfigType } from '../typings';

// Database
import { Database } from '@src/database';


class BusinessService {
  static getListOfBusinessesConfigs(): Array<BusinessConfigType> {
    return Database.getListOfBusinessesConfigs();
  }

  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType | undefined {
    return Database.getBusinessConfigById(businessId);
  }
}

export default BusinessService;
