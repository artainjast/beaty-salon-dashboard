import { transformCustomerData } from '@/transformers/customerTransformer';
import { CustomerType } from '@/types/Customer';
import React from 'react';

interface Props {
    customer : CustomerType
}

const CustomerItem = ({customer}: Props) => {
    const { id, firstName, lastName, phoneNumber } = transformCustomerData(customer); ;
    return (
      <div className='flex flex-row dark:odd:bg-slate-800 odd:bg-stone-300 items-center p-2'>
        <p className='w-2 ml-4 text-sm'>{id}</p>
        <p className='w-2/4 ml-1 text-sm truncate'>{firstName + ' ' + lastName}</p>
        <p className='w-1/4 ml-1 text-sm '>{phoneNumber}</p>
      </div>
    );
};

export default CustomerItem;