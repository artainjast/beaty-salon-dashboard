import { CustomerType } from '@/types/Customer';

export const transformCustomerData = (data: any): CustomerType => {
  return {
    id: data?.id,
    firstName: data?.FIRST_NAME,
    lastName: data?.LAST_NAME,
    phoneNumber: data?.PHONE_NUMBER
  };
};
