import axiosFetch from '@/api/axios';
import { CUSTOMER_URL } from '@/api/customer';
import { useDebounceFn } from '@/hooks/useDebounceFn';
import { transformCustomerData } from '@/transformers/customerTransformer';
import { CustomerType } from '@/types/Customer';
import React, { useEffect, useState } from 'react';
import Select2 from '.';

const CustomerSelect = ({ reference, onChange , className }: any) => {
  const [customers, setCustomers] = useState<Array<CustomerType>>();
  useEffect(() => {
    axiosFetch.get(CUSTOMER_URL).then((res) => {
      setCustomers(res.data.data);
    });
  }, []);

  const getNewCustomer = (inputText: string) => {
    axiosFetch.get(`${CUSTOMER_URL}?text=${inputText}`).then((res) => {
      setCustomers(res.data.data);
    });
  };

  const { action: customerSelectHandlerDebounce } = useDebounceFn({
    callback: getNewCustomer,
    delay: 700
  });
  const selectChangeHandler = (selected: CustomerType) => {
    if (onChange) {
      onChange(selected);
      return;
    }
    (selected: CustomerType) => (reference.current = selected);
    return;
  };
  //TODO: it reRender by closing select
  return (
    <div className={className}>
      <Select2
        getOptionLabel={(option: CustomerType) => `${option.firstName} ${option.lastName} (${option.phoneNumber})`}
        getOptionValue={(option: CustomerType) => option.id}
        placeholder='مشتری مورد نظر را انتخاب کنید.(اجباری)'
        transformer={transformCustomerData}
        options={customers}
        styles={{
          color: 'blue',
          backgroundColor: 'rgb(71 85 105)'
        }}
        onChange={(selected: CustomerType) => (reference.current = selected)}
        onInputChange={customerSelectHandlerDebounce}
        isClearable
      />
    </div>
  );
};

export default CustomerSelect;
