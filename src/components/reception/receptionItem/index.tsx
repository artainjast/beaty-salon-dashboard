import { transformReceptionData } from '@/transformers/receptionTransformers';
import { ReceptionType } from '@/types/Reception';
import { toFaCurrency } from '@/utils/number';
import Router from 'next/router';
import React from 'react';

interface Props {
  reception: ReceptionType;
  onDetailClick: (id:number) => void;
}

const ReceptionItem = ({ reception , onDetailClick }: Props) => {
  
  const { id, firstName, lastName, createdAt, price  , description} = transformReceptionData(reception);
  const test = () => {
    Router.push('?modal')
    //@ts-ignore
    onDetailClick(id)
  }
  //@ts-ignore
  const date = new Date(createdAt * 1000).toLocaleDateString('fa-IR')
  return (
    <div className='flex flex-row border-b border-b-slate-400 items-center p-2'>
      <p className='w-2 ml-4 text-sm'>{id}</p>
      {/* <p className='w-1/4 ml-1 text-sm truncate'>{firstName + ' ' + lastName}</p> */}
      
      <p className='w-1/4 ml-1 text-sm '>{date}</p>
      <p className='w-1/4 ml-1 text-sm '>{toFaCurrency(price)}</p>
      <p className='w-1/4 ml-1 text-sm '>{description}</p>
      <p onClick={test}>مشخصات</p>
    </div>
  );
};

export default ReceptionItem;