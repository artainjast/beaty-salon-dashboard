import axiosFetch from '@/api/axios';
import { RECEPTIONS_URL } from '@/api/reception';
import Button from '@/components/cubes/Button';
import TextField from '@/components/cubes/TextField';
import CustomerSelect from '@/components/selects/customerSelect';
import SubServiceSelect from '@/components/selects/subServiceSelect';
import { CustomerType } from '@/types/Customer';
import { SubServiceType } from '@/types/subService';
import { toFaCurrency } from '@/utils/number';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import PaymentComponent from '../paymentButton';
import { useForm, useFormContext } from "react-hook-form";
import VoucherForm from '../voucherForm';

const ReceptionAdd = ({openCustomerModal , openServiceModal}:any) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [priceDiscount , setPriceDiscount] = useState(0)
  const [discountValue , setDiscountValue] = useState(0)
  const customerSelected = useRef<CustomerType>();  
  const SubServiceSelected = useRef<Array<SubServiceType>>();  
  const [isPending, setIsPending] = useState(false);
 
 
  const { register, handleSubmit, setValue,watch , formState: { errors } } = useForm();

  const payments = watch("payments");
 
  useEffect(() => {
    let total = 0 ;
    payments && payments.map((item) => {      
      total += +item.amount
    })    
    setTotalPayment(total);
  },[payments])
  const addReception = (data) => {
    data.customerId = customerSelected.current?.id
    data.services = SubServiceSelected.current
    
    setIsPending(true);
    axiosFetch.post(RECEPTIONS_URL, {
      ...data
    }).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
         toast.error(res.data.message, {
           position: toast.POSITION.TOP_CENTER
         });
      }
      setIsPending(false);

    }).catch((err) => {
      
       toast.error(err?.response?.data.message ? err.response.data.message : 'مشکلی پیش آمده به ادمین اطلاع دهید' , {
         position: toast.POSITION.TOP_CENTER
       });
      setIsPending(false);

    })
  }
  const subServiceChangeHandler = (selected:Array<SubServiceType>) => {
    setTotalPrice(0);
    SubServiceSelected.current = selected;
    SubServiceSelected.current && SubServiceSelected.current?.map((item) => {
      setTotalPrice(totalPrice + item.price);
    })
  }
  
  const onCheckVoucher = (data) => {
    
    if (data) {
      
      if (data[0].type === 'percentage') {
        setPriceDiscount(totalPrice - ((data[0].amount / 100) * totalPrice)) ;
        setDiscountValue(((data[0].amount / 100) * totalPrice))
      } else {        
        setPriceDiscount(totalPrice - data[0].amount);
        setDiscountValue((data[0].amount))
      }
      
    }
  
  }

  return (
    <div className='w-full px-5 py-4 bg-neutral-50'>
      <form onSubmit={addReception}>
        <div className='flex flex-row justify-between items-center'>
          <CustomerSelect className='my-3 w-10/12' reference={customerSelected} />
          <Button
            className='bg-lime-500 rounded-md h-10 w-10 my-3'
            type='button'
            onClick={() => openCustomerModal(true)}
          >
            <span className='text-lg text-zinc-600'>+</span>
          </Button>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <SubServiceSelect className='my-3' onChange={subServiceChangeHandler} reference={SubServiceSelected} />
          <Button
            className='bg-lime-500 rounded-md h-10 w-10 my-3'
            type='button'
            onClick={() => openServiceModal(true)}
          >
            <span className='text-lg text-zinc-600'>+</span>
          </Button>
        </div>
        <TextField 
          className='rounded w-full h-10 p-2 text-xs' 
          register={register}
          name='description'
          placeholder='توضیحات (اختیاری)'
        />
        <PaymentComponent register={register} setValue={setValue} errors={errors} />
        <VoucherForm register={register} onCheckVoucher={onCheckVoucher}  setValue={setValue} errors={errors}/>
        <div className='flex flex-col mt-4'>
          <div className='flex justify-between py-2'>
            <p>مبلغ کل</p>
            {totalPrice > 0 && (
              <div className='flex flex-row'>
                <p>{toFaCurrency(totalPrice)} تومان</p>
              </div>
            )}
          </div>
          {priceDiscount && priceDiscount > 0 && <div className='flex justify-between py-2'>
            <p>تخفیف</p>
              <div className='flex flex-row'>
                <p>{toFaCurrency(discountValue)} تومان</p>
              </div>
          </div> 
          }
          <div className='flex justify-between py-2 border-y border-zinc-300'>
            <p>مبلغ پرداختی</p>
            {totalPayment > 0 && (
              <div className='flex flex-row'>
                <p>{toFaCurrency(totalPayment)} تومان</p>
              </div>
            )}
          </div>
          <div className='flex justify-between py-2'>
            <p>باقیمانده</p>
            {totalPayment > 0 && (
              <div className='flex flex-row'>
                <p>{toFaCurrency(totalPrice - totalPayment )} تومان</p>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-row mt-4 mb-4 justify-between items-center'>
          <Button
            disabled={isPending || totalPrice <= 0 || totalPrice - totalPayment != 0}
            className='rounded-lg py-3 px-4 w-full bg-green-500'
            type='submit'
            onClick={handleSubmit(addReception)}
          >
            <p className='text-sm'>ثبت پذیرش</p>
          </Button>
          
        </div>
      </form>
    </div>
  );
};

export default ReceptionAdd;