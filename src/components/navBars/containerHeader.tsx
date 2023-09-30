import React from 'react';
import Image from 'next/image'
import Logo from '../../../assets/images/logo.svg'
import userProfile from '../../../assets/images/userProfile.png';
import style from "./containerHeader.module.scss"
import clsx from 'clsx';
const ContainerHeader = ({ sideBarHandler }:any) => {
  return (
    <div className='dark:bg-slate-600 bg-slate-200 shadow-md w-full flex items-center px-5 justify-between h-11 absolute top-0 left-0'>
      <div onClick={sideBarHandler} className='w-10 h-10 flex items-center justify-center'>
        <span className={clsx(style.hamburger_menu, 'w-4')} />
      </div>
      <div className='w-1/3 flex items-center justify-center'>
        <Image src={Logo} className=' h-5' alt='logo' />
      </div>

      {/* <p className='w-1/3 text-left'>profile</p> */}
      <Image src={userProfile} className='w-8 h-8 dark:bg-slate-400 text-cyan-300' alt={'profile'} />
    </div>
  );
};

export default ContainerHeader;