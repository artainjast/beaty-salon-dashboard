import axiosFetch from '@/api/axios';
import { COUNSELING_STATE_URL } from '@/api/counseling';
import { CUSTOMER_URL } from '@/api/customer';
import { useDebounceFn } from '@/hooks/useDebounceFn';
import { transformCallStateData } from '@/transformers/callStateTransformer';
import { CallStateType } from '@/types/CallState';
import React, { useEffect, useState } from 'react';
import Select2 from '.';

const CallStateSelect = ({ reference, onChange, className }: any) => {
  const [counselingStates, setCounselingStates] = useState<Array<CallStateType>>();
  useEffect(() => {
    axiosFetch.get(COUNSELING_STATE_URL).then((res) => {
      setCounselingStates(res.data.data);
    });
  }, []);

  const getNewCustomer = (inputText: string) => {
    axiosFetch.get(`${CUSTOMER_URL}?text=${inputText}`).then((res) => {
      setCounselingStates(res.data.data);
    });
  };

  const { action: customerSelectHandlerDebounce } = useDebounceFn({
    callback: getNewCustomer,
    delay: 700
  });
  const selectChangeHandler = (selected: CallStateType) => {
    if (onChange) {
      onChange(selected);
      return;
    }
    (selected: CallStateType) => (reference.current = selected);
    return;
  };
  //TODO: it reRender by closing select
  return (
    <div className={className}>
      <Select2
        getOptionLabel={(option: CallStateType) => option.name}
        getOptionValue={(option: CallStateType) => option.id}
        placeholder='مشتری مورد نظر را انتخاب کنید.(اجباری)'
        transformer={transformCallStateData}
        options={counselingStates}
        styles={{
          color: 'blue',
          backgroundColor: 'rgb(71 85 105)'
        }}
        onChange={(selected: CallStateType) => (reference.current = selected)}
        onInputChange={customerSelectHandlerDebounce}
        isClearable
      />
    </div>
  );
};

export default CallStateSelect;
