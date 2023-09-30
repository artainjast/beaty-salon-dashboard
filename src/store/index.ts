import { create } from 'zustand';

export const useCustomerStore = create((set) => ({
  customers: [],
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  // addCustomer: (customer) => set((state) => ({ customers: [customer, ...state.customers] }))
}));
