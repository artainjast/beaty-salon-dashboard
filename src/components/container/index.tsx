import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import ContainerHeader from '../navBars/containerHeader';
import SideBar from '../navBars/sideBar';

interface Props {
  children: ReactNode;
    className: string;
}
const PageContainer = ({ children, className }: Props) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const closeSideBar = () => {
        setIsSideBarOpen(false);
    }

    return (
      <div className={clsx('max-w-lg w-full flex flex-col mx-auto relative', className)}>
        <ContainerHeader sideBarHandler={setIsSideBarOpen} />
        <SideBar isSideBarOpen={isSideBarOpen} sideBarHandler={closeSideBar} />
        {children}
      </div>
    );
};

export default PageContainer;