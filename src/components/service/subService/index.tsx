import axiosFetch from '@/api/axios';
import { SUB_SERVICE_URL } from '@/api/subService';
import Button from '@/components/cubes/Button';
import ListSkeleton from '@/components/skeletons/ListSkeleton';
import { SubServiceType } from '@/types/subService';
import { isEmpty } from '@/utils/helpers';
import clsx from 'clsx';
import  Router  from 'next/router';
import React, { useEffect, useState } from 'react';
import SubServiceItem from './subServiceItem';
import Modal from '@/components/modals';
import { transformSubServiceData } from '@/transformers/subServiceTransformer';
import SwitchButton from '@/components/cubes/Switch';
import TextField from '@/components/cubes/TextField';
import CurrencyInput from 'react-currency-input-field';

const SubService = () => {
    const [offset, setOffset] = useState(0);
    const [subServices, setSubServices] = useState<Array<SubServiceType>>();
    const [isPending, setIsPending] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAbleToIncreaseOffset, setIsAbleToIncreaseOffset] = useState(true);
    const [subServiceModalData , setSubServiceModalData] = useState<SubServiceType>();
    const [subServiceActive , setSubServiceActive] = useState<Boolean>()
    useEffect(() => {
      axiosFetch
        .get(`${SUB_SERVICE_URL}?offset=${offset}`)
        .then((res) => {
          if (!isEmpty(res.data)) {
            setSubServices(res.data.data);
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
    const onEditClick = (id : number) => {
      axiosFetch.get(`${SUB_SERVICE_URL}/${id}`).then((res) => {
        if (!isEmpty(res.data)) {
          //@ts-ignore
          setSubServiceModalData(transformSubServiceData(res.data));
          setIsPending(false);
          setIsModalOpen(true);
          return;
        }
      });
    }
    const submitEdit = (id : number) => {
      axiosFetch.put(`${SUB_SERVICE_URL}/${subServiceModalData?.id}` , {
        
      } ).then((res) => {
        if (!isEmpty(res.data)) {
          //@ts-ignore
          setSubServiceModalData(transformSubServiceData(res.data));
          setIsPending(false);
          setIsModalOpen(true);
          return;
        }
      });
    }
    if (!subServices) {
      return <ListSkeleton />;
    }
   return (
       <div className='flex flex-col'>
         <div>
           <div className='flex flex-row dark:bg-slate-700 bg-slate-100 py-3 px-2  rounded-t-md border border-slate-400'>
             <p className='w-2 ml-3'>#</p>
             <p className='w-2/4 ml-3'>نام</p>
             <p className='w-2/4 '>قیمت</p>
             <p className='w-2/4 '>گزینه ها</p>
           </div>
           <div className='border border-slate-500 rounded-b-md'>
             {!isEmpty(subServices) &&
               !isPending &&
               subServices.map((item: SubServiceType) => {
                 return <SubServiceItem onEditClick={onEditClick} subService={item} />;
               })}
           </div>
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
         <Modal inProp={isModalOpen}> 
         <div className='p-3 flex flex-col'>
          <div className='flex flex-row justify-between border-b border-b-slate-600'>
            <h6 className='font-bold'>مشخصات</h6>
            {/* <span onClick={() => setIsModalOpen(false)} className={clsx(style.closeButton, 'w-10')}></span> */}
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className=''>نام سرویس</p>
              <TextField value={subServiceModalData?.name} onChange={(() => setSubServiceModalData.name) } />
            </div>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className=''>قیمت</p>
              {/* <CurrencyInput
              className='rounded p-2 mb-2'
              onValueChange={(value) => {
                 value && setSubServiceModalData()
                } 
              }
              placeholder='قیمت را به ریال وارد کنید'
            ></CurrencyInput> */}
            </div>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              {/* <p>شماره همراه</p>
              <p>{modalReceptionData?.customer.phoneNumber}</p> */}
            </div>
              <div className='flex justify-between mb-2 py-2 border-b bg-slate-800 border-b-slate-500'>
                <p>فعال</p>
                <SwitchButton defaultValue={subServiceModalData && subServiceModalData.isActive} />
              </div>
          </div>
          <div>
            <Button onClick={submitEdit} >
              ویرایش
            </Button>
          </div>
        </div>
         </Modal>
       </div>
   );
};
export default SubService;