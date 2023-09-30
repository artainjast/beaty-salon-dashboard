import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../../assets/images/logo.svg';
import TextField from '@/components/cubes/TextField';
import Button from '@/components/cubes/Button';
import  axiosFetch  from '@/api/axios';
import { toast } from 'react-toastify';
import { LOGIN_DASHBOARD_URL } from '@/api/login';
import Router from 'next/router';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const isButtonDisable = (userName.length <= 4 && password.length < 8);
  const login = () => {
    if (isButtonDisable) {
      toast.info('.لطفا فیلدهارا کامل پرکنید', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    setIsPending(true);
    axiosFetch
      .post(LOGIN_DASHBOARD_URL, {
        userName,
        password
      })
      .then((res) => {
        if (res.data.status === 1) {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
          Router.push('/');
          localStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
          return;
        }
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      })
      .catch((res) => {
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      });
    setIsPending(false);
    return;
  };

  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <Image src={logo} alt='' className='w-28 h-28' />
      <form className='flex flex-col w-2/3'>
        <div className='flex flex-col'>
          <TextField className='rounded-lg mb-2 p-3 text-xs' onChange={setUserName} placeholder='نام کاربری' />
          <TextField
            className='rounded-lg mb-2 p-3 text-xs'
            onChange={setPassword}
            type='password'
            placeholder='رمز عبور'
          />
        </div>
        <Button disabled={isPending} className='rounded-lg p-2 bg-green-500' type='submit' onClick={login}>
          <p>ورود</p>
        </Button>
      </form>
    </div>
  );
};

export default Login;