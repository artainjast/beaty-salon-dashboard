import clsx from 'clsx';
import React from 'react';
import SideBarItem from './sideBarItem';
import style from './sideBar.module.scss'
import Link from 'next/link';
import ServiceLogo from '../../../../assets/images/service.png';
import SupportLogo from '../../../../assets/images/support.png';
import CustomerLogo from '../../../../assets/images/customer.png';
import ReceptionLogo from '../../../../assets/images/receptionist.png';
const SideBar = ({ isSideBarOpen, sideBarHandler }: any) => {

  const menuItems = [
    // {
    //   id: 1,
    //   title: 'خانه',
    //   url: '/'
    // },
    {
      id: 1,
      title: 'درخواست ها',
      isMain: true,
      url: '/',
      logo: SupportLogo,
      subMenu: [
        {
          id: 11,
          title: 'لیست درخواست  ها',
          url: '/'
        },
      ]
    },
    {
      id: 2,
      title: 'پذیرش ',
      isMain: true,
      logo:ReceptionLogo ,
      subMenu: [
        {
          id: 21,
          title: 'لیست پذیرش ها',
          url: '/reception'
        },
        {
          id: 22,
          title: 'افزودن پذیرش',
          url: '/reception/add'
        }
      ]
    },
    {
      id: 3,
      title: 'سرویس‌ها',
      isMain: true,
      logo: ServiceLogo,
      subMenu: [
        {
          id: 31,
          title: 'اصلی',
          isActive: false,
          subMenu: [
            {
              id: 311,
              title: 'لیست سرویس اصلی',
              url: '/main-services'
            },
            {
              id: 312,
              title: 'افزودن سرویس اصلی',
              url: '/main-services/add'
            }
          ]
        },
        {
          id: 32,
          title: 'فرعی',
          subMenu: [
            {
              id: 321,
              title: 'لیست سرویس فرعی',
              url: '/services/sub-services'
            },
            {
              id: 322,
              title: 'افزودن سرویس فرعی',
              url: '/services/sub-services/add'
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'مشتریان',
      isMain: true,
      logo: CustomerLogo,
      subMenu: [
        {
          id: 41,
          title: 'لیست مشتریان',
          url: '/customer'
        },
        {
          id: 42,
          title: 'افزودن مشتری',
          url: '/customer/add'
        }
      ]
    },
    {
      id: 6,
      title: 'پست ها',
      isMain: true,
      url: '/posts'
    },
    {
      id: 5,
      title: 'ورود',
      isMain: true,
      url: '/user/login'
    },
   
  ];
  return (
    <div
      className={clsx(
        'dark:bg-slate-800 bg-slate-100 fixed top-0 right-0 flex flex-col h-screen w-8/12 z-10 transition-transform',
        { 'translate-x-0': isSideBarOpen },
        { 'translate-x-full': !isSideBarOpen }
      )}
    >
      <div className='h-10 py-2 flex flex-row justify-between mx-3 border-b border-slate-400'>
        <Link href='/'>خانه</Link>
        <div className={style.closeButton} onClick={sideBarHandler}></div>
      </div>
      <div className='mt-4'>
        {menuItems.map((item) => {
          return <SideBarItem key={item.id} sideBarHandler={sideBarHandler} menuBar={item} />;
        })}
      </div>
    </div>
  );
};

export default SideBar;