import clsx from 'clsx';
import React from 'react';
import style from './listSkeleton.module.scss'
const ListSkeleton = () => {
    return (
      <div className={clsx(style.listSkeleton, 'flex flex-col  w-full overflow-hidden')}>
        <div className='h-10 w-full rounded-t-md border border-slate-400'></div>
        <div className='flex flex-col w-full'>
          {Array.from({
            length: 10
          }).map((_, index) => (
            <div
              className='h-9 w-full border  border-slate-400 last:rounded-b-md'
              key={`item-${index}`}
              // style={style}
            />
          ))}
        </div>
      </div>
    );
    
    
};

export default ListSkeleton;