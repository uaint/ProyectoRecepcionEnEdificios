import NavbarConcierge from './NavbarConcierge';
import NavbarResident from './NavbarResident';
import { Outlet } from 'react-router';
import React from 'react';

export default () => {

  const user_role = sessionStorage.getItem('user_role');

  return (
    <>  
    {user_role === '3' ? <NavbarResident /> : <NavbarConcierge />}
      <Outlet />
    </>
  );
};