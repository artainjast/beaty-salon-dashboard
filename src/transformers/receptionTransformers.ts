import { ReceptionDetailType } from '@/types/Reception';
import { ReceptionType } from "@/types/Reception";
import { SubServiceType } from '@/types/SubService';
import { transformCustomerData } from './customerTransformer';
import { transformSubServiceData } from './subServiceTransformer';
import { cleanObject } from '@/utils';

export const transformReceptionData = (data: any): Partial<ReceptionType> => {
  return cleanObject({
    id: data.id,
    customerId: data.CUSTOMER_ID,
    price: data.PRICE,
    description: data?.DESCRIPTION,
    firstName: data?.FIRST_NAME,
    lastName: data?.LAST_NAME,
    createdAt: data?.CREATED_AT,
    phoneNumber: data?.PHONE_NUMBER
  })
   
};

export const transformDetailReceptionData = (data: any): Partial<ReceptionDetailType> => {
    
  return {
    //@ts-ignore
    reception: transformReceptionData(data?.reception),
    subServices: data?.subServices.map((item: SubServiceType) => {
      const cartItem = transformSubServiceData(item);
      return cartItem;
    }),
    customer: transformCustomerData(data?.customer)
  }; 
};
