import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';

const NavbarConcierge = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <ul>
        <li><Link to="/admincorrespondence">{t('navbarConcierge.adminCorrespondence')}</Link></li>
        <li><Link to="/adminfrequentvisits">{t('navbarConcierge.adminFrequentVisits')}</Link></li>
        <li><Link to="/searchpersoncam">{t('navbarConcierge.searchPerson')}</Link></li>
        <li><Link to="/newvisitform">{t('navbarConcierge.newVisit')}</Link></li>
        <li><Link to="/newvehicleform">{t('navbarConcierge.newVehicle')}</Link></li>
        <li><Link to="/adminparking">{t('navbarConcierge.adminParking')}</Link></li>
        <li><Link to="/adminmessages">{t('navbarConcierge.messages')}</Link></li>
        <li><Link to="/configadmin">{t('navbarConcierge.config')}</Link></li>
        <li><Link to="/home">{t('navbarConcierge.signOut')}</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarConcierge;
