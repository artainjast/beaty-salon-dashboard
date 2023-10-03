import clsx from 'clsx';
import React from 'react';
import SideBarItem from './sideBarItem';
import style from './sideBar.module.scss'
import Link from 'next/link';
import ServiceLogo from '../../../../assets/images/service.png';
import SupportLogo from '../../../../assets/images/support.png';
import CustomerLogo from '../../../../assets/images/customer.png';
import ReceptionLogo from '../../../../assets/images/receptionist.png';
import { Icon } from '../../Icon';
import { MenuBarItem } from '@/types';
import { hasToken } from '@/utils';
const SideBar = ({ isSideBarOpen, sideBarHandler }: any) => {

  const menuItems: MenuBarItem[] = [
  {
      id: 2,
      title: 'پذیرش ',
      isMain: true,
      logo:'recipt-outline' ,
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
      id: 4,
      title: 'مشتریان',
      isMain: true,
      logo: 'girl-face-outline',
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
      id: 1,
      title: 'درخواست ها',
      isMain: true,
      logo: 'support' ,
      subMenu: [
        {
          id: 11,
          title: 'لیست درخواست  ها',
          url: '/Counseling'
        },
      ]
    },
    
    
    {
          id: 7,
          title: 'نوبت دهی',
          logo : 'schedule-outline',
          subMenu: [
            {
              id: 71,
              title: 'لیست نوبت ',
              url: '/reservation/list'
            },
            {
              id: 72,
              title: 'افزودن نوبت دهی',
              url: '/reservation/add'
            }
          ]
    },
        {
      id: 3,
      title: 'سرویس‌ها',
      isMain: true,
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
        },
        
      ]
    },
    {
      id: 6,
      title: 'پست ها',
      isMain: true,
      logo: 'photo-library-outline',
      url: '/posts'
    }
   
  ];

  if (!hasToken()) menuItems.push({
      id: 5,
      title: 'ورود',
      isMain: true,
      url: '/user/login',
      logo: 'login',
    })
    

  return (
    <div
      className={clsx(
        'bg-slate-100 absolute top-0 right-0 flex flex-col h-screen w-8/12 z-10 transition-transform',
        { 'translate-x-0': isSideBarOpen },
        { 'translate-x-full': !isSideBarOpen }
      )}
    >
      <div className='h-10 py-2 flex flex-row justify-between items-center mx-3 border-b border-slate-400'>
        <Link className='flex gap-2' href='/'>
          <Icon name='home' size={18} className='text-neutral-800' />
          <p>خانه</p>
        </Link>
        <Icon name='close' size={18} className='text-neutral-800' onClick={sideBarHandler}/>
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