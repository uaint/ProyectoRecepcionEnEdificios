import NavbarConcierge from './NavbarConcierge';
import NavbarResident from './NavbarResident';
import NavbarAdmin from './NavbarAdmin';
import { Outlet } from 'react-router';
import React from 'react';

export default () => {

  // user_role = 3 => Resident
  const user_role = sessionStorage.getItem('user_role');

  return (
    <>  
    {user_role === '1' ? <NavbarAdmin /> : user_role === '2' ? <NavbarConcierge /> : <NavbarResident />}
      <Outlet />
    </>
  );
};