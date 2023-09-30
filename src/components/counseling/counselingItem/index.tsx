import React from 'react';
import { transformCounselingsData } from '@/transformers/counselingTransformer';
import { CounselingType } from '@/types/Counseling';
interface Props {
    counseling: CounselingType;
}

const CounselingItem = ({ counseling }: Props) => {
    const { id, nickName, phoneNumber, stateName, stateId } = transformCounselingsData(counseling);

    return (
      <div className='flex flex-row dark:odd:bg-slate-800 odd:bg-stone-300 items-center p-2'>
        <p className='w-2 ml-4 text-sm'>{id}</p>
        <p className='w-1/4 ml-1 text-sm truncate'>
          {nickName.length <= 0 || nickName === '1' ? 'نام ندارد' : nickName}
        </p>
        <a href={`tel://${phoneNumber}`} className='w-1/4 text-sm'>
          {phoneNumber}
        </a>
      </div>
    );
};

export default CounselingItem;