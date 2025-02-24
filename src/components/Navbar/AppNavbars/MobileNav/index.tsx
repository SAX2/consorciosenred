import React from 'react';
import { MobileNavs } from './constants';
import NavLinkButton from 'app/components/Buttons/ButtonNavLink';

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 w-full px-2 py-2 border-t border-outline bg-white dark:bg-black-app-bg z-50">
      <div className='flex items-center w-full justify-center gap-8'>
        {MobileNavs.map((nav) => {
          return <NavLinkButton href={nav.path} className='flex flex-col gap-[1px] items-center' key={nav.path + nav.title}>
            <span>{nav.icon}</span>
          </NavLinkButton>;
        })}
      </div>
    </div>
  );
};

export default MobileNav;
