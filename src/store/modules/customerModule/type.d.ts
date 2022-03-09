export type customerAttribute = {
  id?: number;
  name: string;
  phone: string;
  numberOfVisits: number;
  lastVisitedDate: string;
  customerType: string;
  nameKana: string;
  postcode: string;
  prefecture: string;
  municipality: string;
  address: string;
  buildingAddress: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  remarks: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  discardedAt: string;
};

export type CustomerType = {
  type: string;
  id: number;
  attributes: customerAttribute;
};

export type CustomerDataType = {
  customers: Array<CustomerType>;
  paging: {
    total: number;
    page: number;
    limit: number;
  };
  current: CustomerType;
};

export type CustomerData = {
  isLoading: boolean;
  error: string;
  customer: CustomerDataType;
};

export type UsageHistory = {
  date: string;
  isChecked: boolean;
  numberOfPeople: number;
};

export type NewCustomerPayload = {
  customer: CustomerAttribute;
};

export type CustomerFilterType = {
  name?: string;
  phone?: string;
  customerType?: string;
  customerNumber?: number;
};
