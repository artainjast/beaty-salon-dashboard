import { transformSubServiceData } from '@/transformers/subServiceTransformer';
import { SubServiceType } from '@/types/SubService';
import { toFaCurrency } from '@/utils/number';
import React from 'react';


interface Props {
    subService: SubServiceType;
    onEditClick : any;
}

const SubServiceItem = ({subService , onEditClick} : Props) => {
    const { id, name, price } = transformSubServiceData(subService);
    const edit = () => {
      onEditClick(id)
    }
    return (
      <div className='flex flex-row border-b border-b-slate-400 items-center p-2'>
        <p className='w-2 ml-4 text-sm'>{id}</p>
        <p className='w-2/4 ml-1 text-sm truncate'>{name}</p>
        <p className='w-2/4 ml-1 text-sm '>{toFaCurrency(price)}</p>
        <p className='w-2/4 ml-1 text-sm' onClick={edit}>ویرایش</p>
      </div>
    );
};

export default SubServiceItem;