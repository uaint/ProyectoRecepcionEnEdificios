// NavbarConcierge.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NavbarConcierge = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admincorrespondence">Admin Correspondance</Link></li>
        <li><Link to="/adminfrequentvisits">Admin Frequent Visits</Link></li>
        <li><Link to="/searchpersoncam">Search Person</Link></li>
        <li><Link to="/newvisitform">New Visit</Link></li>
        <li><Link to="/newvehicleform">New Vehicle</Link></li>
        <li><Link to="/adminparking">Admin Parking</Link></li>
        <li><Link to="/adminmessages">Messages</Link></li>
        <li><Link to="/configadmin">Config</Link></li>
        <li><Link to="/home">Sign Out</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarConcierge;
