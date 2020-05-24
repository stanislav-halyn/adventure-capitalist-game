
export type BusinessConfigType = {
  id: BusinessIdType,
  price: number
  title: string
};

export type BusinessIdType = number;

export interface IBusiness {
  id: BusinessIdType

  getPrice: () => number
}

export class Business implements IBusiness {
  id = 0;

  getPrice(): number {
    return 0;
  }
}

export class BusinessService {
  static getBusinessConfigById(businessId: BusinessIdType): BusinessConfigType {
    businessId
    return {
      id: 0,
      price: 0,
      title: ''
    };
  }
}
