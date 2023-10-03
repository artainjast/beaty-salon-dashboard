import clsx from 'clsx';
import React from 'react';
import style from './listSkeleton.module.scss'
const ListSkeleton = () => {
    return (
      <div className={clsx(style.listSkeleton, 'flex flex-col w-full py-4 px-5 overflow-hidden mt-2 bg-neutral-50')}>
        <div className='h-10 w-full border-b border-b-neutral-500 bg-neutral-100 py-4 px-4'></div>
        <div className='flex flex-col w-full'>
          {Array.from({
            length: 10
          }).map((_, index) => (
            <div
              className='border-b border-b-slate-400  h-9 w-full '
              key={`item-${index}`}
              // style={style}
            />
          ))}
        </div>
      </div>
    );
    
    
};

export default ListSkeleton;