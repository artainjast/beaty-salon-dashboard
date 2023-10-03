import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import ContainerHeader from '../cubes/navBars/containerHeader';
import SideBar from '../cubes/navBars/sideBar';

interface Props {
  children: ReactNode;
  className: string;
  hideNavbar?: boolean;
}
const PageContainer = ({ children, className , hideNavbar }: Props) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const closeSideBar = () => {
        setIsSideBarOpen(false);
    }
    console.log(hideNavbar);
    
    return (
      <div className={clsx('max-w-lg w-full flex flex-col mx-auto overflow-x-hidden relative', className)}>
        {!hideNavbar && <ContainerHeader sideBarHandler={setIsSideBarOpen} />}
         <SideBar isSideBarOpen={isSideBarOpen} sideBarHandler={closeSideBar} />
        {children}
      </div>
    );
};

export default PageContainer;