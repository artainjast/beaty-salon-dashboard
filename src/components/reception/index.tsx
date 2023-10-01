import axiosFetch from '@/api/axios';
import { RECEPTIONS_URL } from '@/api/reception';
import { transformDetailReceptionData } from '@/transformers/receptionTransformers';
import { ReceptionDetailType, ReceptionType } from '@/types/Reception';
import { isEmpty } from '@/utils/helpers';
import clsx from 'clsx';
import Router  from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../cubes/Button';
import Modal from '../modals';
import ReceptionItem from './receptionItem';
import style from "../navBars/sideBar/sideBar.module.scss"
import { toFa, toFaCurrency } from '@/utils/number';
import ListSkeleton from '../skeletons/ListSkeleton';
import CustomerAdd from '../customer/add';
import SubServiceAdd from '../service/subService/add';
  
export function ReceptionPage  ({ isCustomerModalOpen  , setCustomerModal , isServiceModalOpen , setServiceModal}:any) {
  const [offset, setOffset] = useState(0);
  const [receptions, setReceptions] = useState<Array<ReceptionType>>();
  const [isPending, setIsPending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAbleToIncreaseOffset, setIsAbleToIncreaseOffset] = useState(true);
  const [modalReceptionData, setModalReceptionData] = useState<ReceptionDetailType>();

  useEffect(() => {
    axiosFetch
      .get(`${RECEPTIONS_URL}?offset=${offset}`)
      .then((res) => {
        if (!isEmpty(res.data)) {
          setReceptions(res.data.data);
          setIsPending(false);
          res.data.data.length >= 10 ? setIsAbleToIncreaseOffset(true) : setIsAbleToIncreaseOffset(false);
        }
      })
      .catch((err) => {
        Router.replace(err.response.data.backURL);
      });
  }, [offset]);
  const increaseOffset = () => {
    setOffset(offset + 10);
  };
  const decreaseOffset = () => {
    setOffset(offset - 10);
  };
  const openReceptionDetail = async (id: number) => {
    axiosFetch.get(`${RECEPTIONS_URL}/${id}`).then((res) => {
      if (!isEmpty(res.data)) {
        //@ts-ignore
        setModalReceptionData(transformDetailReceptionData(res.data.data));
        setIsPending(false);
        setIsModalOpen(true);
        return;
      }
    });
  };

  if (!receptions) {
    return <ListSkeleton />;
  }
  return (
    <>
      <div className='flex flex-col py-4 px-5 mt-2 bg-neutral-50'>
        <div>
          <div className='flex flex-row border-b border-b-neutral-500 bg-neutral-100 py-4 px-4'>
            <p className='w-2 ml-3'>#</p>
            <p className='w-1/4 ml-3'>تاریخ</p>
            <p className='w-1/4 '>هزینه</p>
            <p className='w-1/4 ml-3'>توضیحات</p>
            <p className='w-1/6'>بیشتر</p>
          </div>
          <div className=''>
            {!isEmpty(receptions) &&
              !isPending &&
              receptions.map((item: ReceptionType) => {
                return <ReceptionItem onDetailClick={openReceptionDetail} reception={item} />;
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
      </div>
      <Modal inProp={isModalOpen}>
        <div className='p-3 flex flex-col text-stone-800'>
          <div className='flex flex-row justify-between border-b border-b-slate-600'>
            <h6 className='font-bold'>مشخصات</h6>
            <span onClick={() => setIsModalOpen(false)} className={clsx(style.closeButton, 'w-10')}></span>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className='text-stone-800'>نام</p>
              <p className='text-stone-800'>{modalReceptionData?.customer.firstName}</p>
            </div>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className='text-stone-800'>نام خانوادگی</p>
              <p className='text-stone-800'>{modalReceptionData?.customer.lastName}</p>
            </div>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className='text-stone-800'>شماره همراه</p>
              <p className='text-stone-800'>{modalReceptionData?.customer.phoneNumber}</p>
            </div>
            <div className='flex justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className='text-stone-800'>تاریخ مراجعه</p>
              <p className='text-stone-800'>
                {modalReceptionData?.reception?.createdAt &&
                  new Date(modalReceptionData?.reception?.createdAt * 1000).toLocaleDateString('fa-IR')}
              </p>
            </div>
            <div className='flex flex-col justify-between mb-2 py-2 border-b border-b-slate-500'>
              <p className='text-stone-800'> خدمات ارائه شده</p>
              <div className='flex flex-col'>
                {modalReceptionData?.subServices.map((item, index) => {
                  return <p className='px-2 text-stone-800'>{toFa(index + 1) + '.' + item.name}</p>;
                })}
              </div>
            </div>
            <div className='flex justify-between text-stone-800 mb-2 py-2 '>
              <p >هزینه کل</p>
              {toFaCurrency(modalReceptionData?.reception.price)}
            </div>
          </div>
        </div>
      </Modal>
      <Modal inProp={isCustomerModalOpen}>
        <div className='p-3 flex flex-col'>
          <div className='flex flex-row justify-between mb-2'>
            <h6 className='font-bold'>افزودن مشتری</h6>
            <span onClick={() => setCustomerModal(false)} className={clsx(style.closeButton, 'w-10')}></span>
          </div>
          <div className='flex flex-col'>
            <CustomerAdd />
          </div>
        </div>
      </Modal>
      <Modal inProp={isServiceModalOpen}>
        <div className='p-3 flex flex-col'>
          <div className='flex flex-row justify-between mb-2'>
            <h6 className='font-bold'>افزودن سرویس فرعی</h6>
            <span onClick={() => setServiceModal(false)} className={clsx(style.closeButton, 'w-10')}></span>
          </div>
          <div className='flex flex-col'>
            <SubServiceAdd />
          </div>
        </div>
      </Modal>
    </>
  );
};

