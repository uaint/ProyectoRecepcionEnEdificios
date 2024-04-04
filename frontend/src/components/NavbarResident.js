// NavbarResident.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavbarResident = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/notifications">Notifications</Link></li>
        <li><Link to="/adminfrequentvisits">Admin Frequent Visits</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/config">Config</Link></li>
        <li><Link to="/home">Sign Out</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarResident;