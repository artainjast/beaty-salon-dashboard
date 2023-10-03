import axiosFetch from '@/api/axios';
import { DISCOUNT_URL } from '@/api/discount';
import Button from '@/components/cubes/Button';
import TextField from '@/components/cubes/TextField';
import clsx from 'clsx';
import React, { useState } from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

type VoucherFormProps = {
    register: UseFormRegister<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    errors: DeepMap<FieldValues, FieldError>;
    onCheckVoucher: ({amount , type}) => void;


};

const VoucherForm: React.FC<VoucherFormProps> = ({ register, errors , onCheckVoucher }) => {
  const [showForm, setShowForm] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCheckVoucher = () => {
    axiosFetch.get(`${DISCOUNT_URL}/${voucherCode}`).then((res) => {
        toast(res.data.message)
        onCheckVoucher(res.data.data)
    }).catch((err) => {
      console.log(err);
      
      toast(err?.data?.message ? err.data.message : 'مشکلی پیش آمده ' )
    })
   
  };

  const handleVoucherCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(event.target.value); // Update the voucher code state
  };

  return (
    <div>
      <Button type='button' className={clsx('border border-green-700 p-2 rounded-md mt-2 text-xs' , {'border-red-600' : showForm })} onClick={handleToggleForm}>
          {showForm ? 'حذف تخفیف' : 'افزودن تخفیف'}
      </Button>
      {showForm && (
        <div className='mt-2 flex justify-between' >
            <input
            type='text'
            {...register('voucherCode')}
            placeholder="کد تخفیف را وارد کنید" 
            className='p-2 rounded w-9/12 text-sm'
            maxLength={6}
            value={voucherCode} // Set the input value to the voucherCode state
            onChange={handleVoucherCodeChange} // Handle input change and update voucherCode state
          />
          {errors.voucherCode && <span>{errors.voucherCode.message}</span>}
          <Button className={clsx('p-3 bg-green-500 rounded text-xs')} type='button' onClick={handleCheckVoucher} > ثبت تخفیف</Button>
        </div>
      )}
    </div>
  );
};

export default VoucherForm;
