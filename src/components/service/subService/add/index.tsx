import axiosFetch from '@/api/axios';
import { SUB_SERVICE_URL } from '@/api/subService';
import Button from '@/components/cubes/Button';
import TextField from '@/components/cubes/TextField';
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';
const SubServiceAdd = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const submitSubServiceAdd = () => {
        axiosFetch.post(SUB_SERVICE_URL, {
            name,
            price,
        }).then((res) => {
            if (res.data.status) {
                toast.success(res.data.message);
                setName('');
                setPrice(0);
                return;
            }
            toast.error(res.data.message);
            return;
        })
    }
    return (
        <div className='rounded-md w-full p-2 dark:bg-slate-500 bg-slate-100 mb-5'>
          <form className='flex flex-col'>
            <TextField className='rounded p-2 mb-2' placeholder='نام خدمت را وارد کنید.' onChange={setName} />
            <CurrencyInput
              className='rounded p-2 mb-2'
              onValueChange={(value) => {
                 value && setPrice(+value)
                } 
              }
              placeholder='قیمت را به ریال وارد کنید'
            ></CurrencyInput>
            <Button className='w-full bg-green-500 py-2 rounded ' type='submit' onClick={submitSubServiceAdd}>
              <p>ثبت مشتری</p>
            </Button>
          </form>
        </div>
    );
};

export default SubServiceAdd;