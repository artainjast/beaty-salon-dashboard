import { SubServiceType } from '@/types/subService';

export const transformSubServiceData = (data: any): SubServiceType => {
  
  return {
    id: data.id,
    name: data.NAME,
    price: data.PRICE,
    isActive : data.is_active
  };
};
