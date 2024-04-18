import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarResident = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">{t('navbarResident.notifications')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminfrequentvisits">{t('navbarResident.adminFrequentVisits')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/messages">{t('navbarResident.messages')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/config">{t('navbarResident.config')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">{t('navbarResident.signOut')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarResident;
