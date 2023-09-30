import clsx from 'clsx';
import React, { useState } from 'react';

interface Props {
  defaultValue?: boolean;
}

const SwitchButton = ({ defaultValue = false } : Props ) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultValue);

    const handleClick = () => {
      setIsChecked(!isChecked);
    };
    
    const sliderClasses = clsx(
        'rounded-full border h-6 w-12 bg-gray-300',
        'flex',
        'items-center',
        'cursor-pointer',
        'rtl:justify-start', // Align the switch to the right in RTL
        {
          'bg-indigo-600': isChecked,
        }
      );
    
      const handleClasses = clsx(
        'rounded-full',
        'h-5',
        'w-5',
        'bg-white',
        'shadow',
        'transform',
        'transition-transform',
        { 'translate-x-0.5': isChecked, '-translate-x-6': !isChecked }
      );
  
    return (
      <div className="relative inline-block">
        <div className={sliderClasses} onClick={handleClick}>
          <div className={handleClasses} />
        </div>
      </div>
    );
};

export default SwitchButton;
