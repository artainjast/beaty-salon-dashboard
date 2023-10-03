import Button from '@/components/cubes/Button';
import React, { useState, useEffect } from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface PaymentComponentProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: DeepMap<FieldValues, FieldError>;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ register, setValue, errors }) => {
  const [payments, setPayments] = useState<{ amount: number, paymentType: string }[]>([{amount: 0 , paymentType: '1'}]);

  const handleAddPayment = () => {
    setPayments([...payments, { amount: 0, paymentType: '' }]);
  };

  const handlePaymentChange = (index: number, field: keyof typeof payments[0], value: string | number) => {
    const updatedPayments = [...payments];
    //@ts-ignore
    updatedPayments[index][field] = value;
    setPayments(updatedPayments);
    setValue(`payments[${index}].${field}`, value);
  };



  useEffect(() => {
    setValue('payments', payments);
  }, [payments, setValue]);

  return (
    <div className='mt-2'>
      {payments.map((payment, index) => (
        <div className='flex justify-between' key={index}>
          <input
            type="number"
            {...register(`payments[${index}].amount`)}
            value={payment.amount}
            onChange={(e) => handlePaymentChange(index, 'amount', e.target.value)}
            placeholder='مقدار پرداختی'
            className='p-2 mt-2 ml-2 rounded w-2/3'

          />
          <select
            {...register(`payments[${index}].paymentType`)}
            value={payment.paymentType}
            onChange={(e) => handlePaymentChange(index, 'paymentType', e.target.value)}
            className='p-2 mt-2 rounded'
          >
            <option value="">نوع پرداخت</option>
            <option value="1">کارتخوان</option>
            <option value="2">نقدی</option>
            <option value="3">کارت به کارت</option>
          </select>
          {errors?.payments && errors.payments[index] && (
            <span>{errors.payments[index]?.message}</span>
          )}
        </div>
      ))}
      <Button type='button' className='border border-green-700 p-2 rounded-md mt-2' onClick={handleAddPayment}>
            <p className='text-xs'>افزودن نوع پرداخت</p>
      </Button>
    </div>
  );
};

export default PaymentComponent;
