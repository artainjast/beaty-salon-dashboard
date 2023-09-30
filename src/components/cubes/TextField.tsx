import React, { Dispatch, ForwardedRef, SetStateAction, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  onChange?: Dispatch<SetStateAction<string>> | ((event: React.ChangeEvent<HTMLInputElement>) => void);
  className?: string;
  placeholder?: string;
  pattern?: string;
  type?: 'number' | 'text' | 'tel' | 'password';
  isTextArea?: boolean;
  value?: string;
  register?: UseFormRegister<FieldValues>;
  name?: string;
  maxlength? : number
}

const WrappedComponent = React.forwardRef(function TextField({ onChange, register , name, className, placeholder, pattern , type='text' , value , isTextArea = false , maxlength }: Props , ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement> , ...props ){
  const changeHandler = (e: any) => {
    console.log(e.target.value);
    
    onChange?.(e.target.value);
  };
  
  if (isTextArea) {
    return <textarea ref={ref as ForwardedRef<HTMLTextAreaElement>} className={className} onChange={changeHandler} placeholder={placeholder} />
  }
  return <input maxLength={maxlength} {...register && name && (register(name))}  value={value} type={type} className={className} onChange={changeHandler} placeholder={placeholder} {...props }/>;
})

export default WrappedComponent;