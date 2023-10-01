import axiosFetch from '@/api/axios';
import { CUSTOMER_URL } from '@/api/customer';
import { useCustomerStore } from '@/store';
import { CustomerType } from '@/types/Customer';
import { isEmpty } from '@/utils/helpers';
import clsx from 'clsx';
import  Router  from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../cubes/Button';
import ListSkeleton from '../skeletons/ListSkeleton';
import CustomerItem from './customerItem';
const Customer = () => {
    const [offset, setOffset] = useState(0);
    const [customers, setCustomers] = useState<Array<CustomerType>>();
    const [isPending, setIsPending] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAbleToIncreaseOffset, setIsAbleToIncreaseOffset] = useState(true);
    const customer = useCustomerStore((state: any) => state.customers);

    useEffect(() => {
      axiosFetch
        .get(`${CUSTOMER_URL}?offset=${offset}`)
        .then((res) => {
          if (!isEmpty(res.data)) {
            setCustomers(res.data.data);
            setIsPending(false);
            
            res.data.data.length >= 10 ? setIsAbleToIncreaseOffset(true) : setIsAbleToIncreaseOffset(false);
          }
        })
        .catch((err) => {
          console.log('here error', err.response.data.backURL);
          Router.replace(err.response.data.backURL);
        });
    }, [offset]);
    const increaseOffset = () => {
      setOffset(offset + 10);
    };
    const decreaseOffset = () => {
      setOffset(offset - 10);
    };
    if (!customers) {
      return <ListSkeleton />;
    }
   return (
     <>
       <div className='flex flex-col py-4 px-5 mt-2 bg-neutral-50'>
         <div className=''>
           <div className='flex flex-row border-b border-b-neutral-500 bg-neutral-100 py-4 px-4'>
             <p className='w-2 ml-3'>#</p>
             <p className='w-2/4 ml-3'>نام</p>
             <p className='w-1/4 '>شماره</p>
           </div>
            {!isEmpty(customers) &&
               !isPending &&
               customers.map((item: CustomerType) => {
                 return <CustomerItem  customer={item} />;
            })}
         </div>
         <div className={clsx('flex flex-row justify-between mt-2', { 'flex-row-reverse': !isAbleToIncreaseOffset })}>
           {isAbleToIncreaseOffset && (
             <Button className='border border-blue-400 py-1 px-2 rounded-tr-md rounded-br-md' onClick={increaseOffset}>
               <span className='text-xs'>{'<'} صفحه بعدی </span>
             </Button>
           )}
           {offset >= 10 && (
             <Button className='border border-blue-400 py-1 px-2 rounded-tl-md rounded-bl-md' onClick={decreaseOffset}>
               <span className='text-xs'> صفحه قبلی {'>'}</span>
             </Button>
           )}
         </div>
       </div>
     </>
   );
};

export default Customer;