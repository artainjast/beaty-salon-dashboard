import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import ContainerHeader from '../cubes/navBars/containerHeader';
import SideBar from '../cubes/navBars/sideBar';
import { hasToken } from '@/utils';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
  className: string;
  hideNavbar?: boolean;
  isAuth?: boolean;
}
const PageContainer = ({ children, className , hideNavbar , isAuth }: Props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();
    const closeSideBar = () => {
        setIsSideBarOpen(false);
    }
    if (!hasToken()) {
      router.push('/user/login')
    }
    if (isAuth) {
      hasToken() && router.push('/')
    }
    return (
      <div className={clsx('max-w-lg w-full flex flex-col mx-auto overflow-x-hidden relative', className)}>
        {!hideNavbar && <ContainerHeader sideBarHandler={setIsSideBarOpen} />}
         <SideBar isSideBarOpen={isSideBarOpen} sideBarHandler={closeSideBar} />
        {children}
      </div>
    );
};

export default PageContainer;