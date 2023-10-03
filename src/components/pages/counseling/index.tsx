import axiosFetch  from '@/api/axios';
import { COUNSELING_URL } from '@/api/counseling';
import { CounselingType } from '@/types/Counseling';
import { isEmpty } from '@/utils/helpers';
import clsx from 'clsx';
import  Router  from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from '../../cubes/Button';
import ListSkeleton from '../../skeletons/ListSkeleton';
import CounselingItem from './counselingItem';


export function CounselingPage  ()  {
    const [offset, setOffset] = useState(0);
    const [counselings, setCounselings] = useState<Array<CounselingType>>();
    const [isPending, setIsPending] = useState(true);
  const [isAbleToIncreaseOffset, setIsAbleToIncreaseOffset] = useState(true);

    useEffect(() => {
        axiosFetch
          .get(`${COUNSELING_URL}?offset=${offset}`)
          .then((res) => {
            if (!isEmpty(res.data)) {
              setCounselings(res.data.data);
              setIsPending(false);
              res.data.data.length >= 10 ? setIsAbleToIncreaseOffset(true) : setIsAbleToIncreaseOffset(false);
            }
          })
          .catch((err) => {
            if (err.response.status === 401 || 403) {
               Router.replace(err.response.data.backURL);
            }
            
            
           
          });
    }, [offset]);
    const increaseOffset = () => {
        setOffset(offset + 10);
    };
    const decreaseOffset = () => {
        setOffset(offset - 10);
    };
    if (!counselings) {
      return <ListSkeleton />;
    }
    return (
      <>
        <div className='flex flex-col'>
          <div className=' rounded-md'>
            <div className='flex flex-row bg-slate-100 shadow-md py-3 px-2'>
              <p className='w-2 ml-3'>#</p>
              <p className='w-1/4 ml-3'>نام</p>
              <p className='w-1/4 ml-3'>شماره</p>
              <p className='w-1/4 ml-3'>وضعیت</p>
            </div>
            {!isEmpty(counselings) &&
              !isPending &&
              counselings.map((item: CounselingType) => {
                return <CounselingItem counseling={item} />;
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
