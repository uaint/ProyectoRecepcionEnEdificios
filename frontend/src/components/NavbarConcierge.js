import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarConcierge = () => {
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
            <Link className="nav-link" to="/admincorrespondence">{t('navbarConcierge.adminCorrespondence')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/searchpersoncam">{t('navbarConcierge.searchPerson')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newvisitform">{t('navbarConcierge.newVisit')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newvehicleform">{t('navbarConcierge.newVehicle')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/adminparking">{t('navbarConcierge.adminParking')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/adminmessages">{t('navbarConcierge.messages')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/configadmin">{t('navbarConcierge.config')}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">{t('navbarConcierge.signOut')}</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default NavbarConcierge;
