import { Icon } from '@/components/cubes/Icon';
import { MenuBarItem } from '@/types/MenuBar';
import clsx from 'clsx';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';

interface Props {
  menuBar: MenuBarItem;
  sideBarHandler?: () => void;
}


const SideBarItem = ({ menuBar, sideBarHandler }: Props) => {
  const [isSubMenuExpand, setIsSubMenuExpand] = useState(false);
  const route = useRouter().asPath;  

  const routerHandler = () => {
    sideBarHandler?.();
    menuBar.url && Router.push(menuBar.url)
  };

  const toggleMenu = () => {
    if (isSubMenuExpand) {
      setIsSubMenuExpand(false);
      return;
    }
    setIsSubMenuExpand(true);
    return;
  }
  return (
    <div className='p-2 px-3'>
      {menuBar.subMenu && menuBar.isActive !== false ? (
        <div>
          <div className='flex flex-row text-neutral-700 items-center'>
            {menuBar.logo && <Icon name={menuBar.logo} size={18} className='ml-2' />}
            <p className={clsx( { 'text-slate-500': isSubMenuExpand })} onClick={toggleMenu}>
              {menuBar.title}
            </p>
          </div>

          <div
            className={clsx('transition-all ', { 'max-h-fit': isSubMenuExpand, 'max-h-0 hidden': !isSubMenuExpand })}
          >
            {menuBar.subMenu.map((menuBar) => {
              return <SideBarItem key={menuBar.id} sideBarHandler={routerHandler} menuBar={menuBar} />;
            })}
          </div>
        </div>
      ) : (
        menuBar.url && (
          <div className='flex flex-row items-center'>
            {menuBar.url === route && <Icon name='arrow-right' size={12} className='rotate-180 ml-2' />}
              <div className='flex items-center gap-2' key={menuBar.id} onClick={routerHandler}>
              {menuBar.logo && <Icon name={menuBar.logo} />}
              <p className={clsx( {'text-sm': !menuBar.isMain })}>{menuBar.title}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SideBarItem;