import { CustomerType } from './Customer';
import { SubServiceType } from "./subService";

export interface ReceptionType {
  id: number;
  customerId: string;
  price: number;
  description: string;
  firstName?: string;
  lastName?: string;
  createdAt: number;
  phoneNumber?: string;
}

export interface ReceptionDetailType {
  reception: ReceptionType;
  subServices: Array<SubServiceType>;
  customer : CustomerType
}
