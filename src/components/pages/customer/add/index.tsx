import axiosFetch from '@/api/axios';
import { CUSTOMER_URL } from '@/api/customer';
import Button from '@/components/cubes/Button';
import TextField from '@/components/cubes/TextField';
import { useCustomerStore } from '@/store';
import { CustomerType } from '@/types/Customer';
import { toEn } from '@/utils/number';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CustomerAdd = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  const submitCustomer = () => {
       
        axiosFetch
          .post(CUSTOMER_URL, {
            firstName,
            lastName,
            phoneNumber: toEn(phoneNumber)
          })
          .then((res) => {
           
            if (res.data.status === 1) {
              toast.success(res.data.message);
              
            }
            if (res.data.status === -1) {
              toast.info(res.data.message);
            }
            
            
          }).catch((err) => {            
            console.log(err);
            
            toast.error(err.response.data.message);
          })
    }
    return (
      <div className='w-full px-5 py-4 bg-neutral-50'>
        <form className='flex flex-col'>
          <TextField className='rounded p-2 mb-2' placeholder='نام مشتری را وارد کنید.' onChange={setFirstName} />
          <TextField className='rounded p-2 mb-2' placeholder='نام خانوادگی را وارد کنید.' onChange={setLastName} />
          <TextField
            className='rounded p-2 mb-2'
            placeholder='شماره تلفن مشتری را وارد کنید.'
            onChange={setPhoneNumber}
          />
          <Button className='w-full bg-green-500 py-2 rounded ' type='submit' onClick={submitCustomer}>
            <p>ثبت مشتری</p>
          </Button>
        </form>
      </div>
    );
};

export default CustomerAdd;