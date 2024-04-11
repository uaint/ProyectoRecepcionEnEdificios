import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';

const NavbarResident = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <ul>
        <li><Link to="/notifications">{t('navbarResident.notifications')}</Link></li>
        <li><Link to="/adminfrequentvisits">{t('navbarResident.adminFrequentVisits')}</Link></li>
        <li><Link to="/messages">{t('navbarResident.messages')}</Link></li>
        <li><Link to="/config">{t('navbarResident.config')}</Link></li>
        <li><Link to="/home">{t('navbarResident.signOut')}</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarResident;
