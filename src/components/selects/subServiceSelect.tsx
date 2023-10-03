import axiosFetch from '@/api/axios';
import { SUB_SERVICE_URL } from '@/api/subService';
import { useDebounceFn } from '@/hooks/useDebounceFn';
import { transformSubServiceData } from '@/transformers/subServiceTransformer';
import { SubServiceType } from '@/types/SubService';
import { toFaCurrency } from '@/utils/number';
import React, { useEffect, useState } from 'react';
import Select2 from '.';
import clsx from 'clsx';

const SubServiceSelect = ({ reference, onChange, className }: any) => {
  const [subServices, setSubServices] = useState<Array<SubServiceType>>();

  useEffect(() => {
    axiosFetch.get(SUB_SERVICE_URL).then((res) => {
        setSubServices(res.data.data)
    });
  }, []);

  const filterCustomer = (inputText: string) => {
    axiosFetch.get(`${SUB_SERVICE_URL}?text=${inputText}`).then((res) => {
      setSubServices(res.data.data);
    });
  };

  const { action: customerSelectHandlerDebounce } = useDebounceFn({
    callback: filterCustomer,
    delay: 700
  });
  const selectChangeHandler = (selected: SubServiceType) => {
    if (onChange) {
      onChange(selected);
      return;
    }
    (selected: SubServiceType) => (reference.current = selected);
    return;
  };
  
  //TODO: it reRender by closing select
  
  return (
    <div className={clsx('w-full ml-3' , className) }>
      <Select2
        getOptionLabel={(option: any) => {          
          return `${option.name} ${toFaCurrency(option.price)}`;
        }}
        getOptionValue={(option: SubServiceType) => option.id}
        placeholder='سرویس های انجام شده را انتخاب کنید.(اجباری)'
        transformer={transformSubServiceData}
        options={subServices}
        styles={{
          color: 'blue',
          backgroundColor: 'rgb(71 85 105)'
        }}
        onChange={selectChangeHandler}
        onInputChange={customerSelectHandlerDebounce}
        isMulti
      />
    </div>
  );
};

export default SubServiceSelect;
