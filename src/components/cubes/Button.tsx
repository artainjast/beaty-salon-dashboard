import clsx from 'clsx';
import React, { ReactNode, RefObject } from 'react';

interface Props {
    children: ReactNode;
    onClick?: (() => void) | any;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
    formRef?: RefObject<HTMLFormElement>;

}

const Button = ({ children, onClick, type = 'button', className , disabled  , formRef}: Props) => {
  const clickButton = (e: any) => {
    e.preventDefault();
    onClick?.();
    // formRef?.current?.submit();
  };
  return (
    <button disabled={disabled} className={clsx({ 'opacity-50 cursor-not-allowed': disabled } , className)} type={type} onClick={clickButton}>
      {children}
    </button>
  );
};

export default Button;