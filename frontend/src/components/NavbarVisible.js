import React from 'react';
import NavbarConcierge from './NavbarConcierge';
import { Outlet } from 'react-router';

export default () => {
  return (
    <>  
      <NavbarConcierge />
      <Outlet />
    </>
  );
};