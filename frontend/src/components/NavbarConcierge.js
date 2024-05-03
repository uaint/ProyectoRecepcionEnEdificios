import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from '../i18n';
import '../App.css';

// Navbar style
const navbarStyle = {
  textAlign: 'center',
}

// Button to change language (i18n package)
const NavbarConcierge = () => {
  const { t } = useTranslation();
  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };


  // Logout and delete token from local storage. Afterwards, redirect to login page.
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3 fixed-top" style={navbarStyle}>
      <div class="container-fluid">
        <div className="btn-group navbar-brand" role="group" style={navbarStyle}>
          <button
              type="button"
              className={`btn ${i18n.language === 'es' ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}`}
              onClick={() => handleLanguageChange('es')}
          >
              ESP
          </button>
          <button
              type="button"
              className={`btn ${i18n.language === 'en' ? 'btn-danger btn-sm' : 'btn-secondary btn-sm'}`}
              onClick={() => handleLanguageChange('en')}
          >
              EN
          </button>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
          <li class="nav-item dropdown me-4">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('navbarConcierge.admin')}
              </a>
              <ul class="dropdown-menu" style={navbarStyle}>
              <Link class="nav-link" to="/admincorrespondence">{t('navbarConcierge.adminCorrespondence')}</Link>
              <Link class="nav-link" to="/adminfrequentvisits">{t('navbarConcierge.adminFrequentVisits')}</Link>
              <Link class="nav-link" to="/adminparking">{t('navbarConcierge.adminParking')}</Link>
              </ul>
            </li>
            <li class="nav-item dropdown me-4">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('navbarConcierge.searchPerson')}
              </a>
              <ul class="dropdown-menu" style={navbarStyle}>
                <li><Link class="dropdown-item" to="/searchpersonbyrut">{t('navbarConcierge.searchByRut')}</Link></li>
                <li><Link class="dropdown-item" to="/scanid">{t('navbarConcierge.scanID')}</Link></li>
              </ul>
            </li>
            <li class="nav-item dropdown me-4">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('navbarConcierge.new')}
              </a>
              <ul class="dropdown-menu" style={navbarStyle}>
              <Link class="nav-link" to="/newvisitform">{t('navbarConcierge.newVisit')}</Link>
              <Link class="nav-link" to="/newvehicleform">{t('navbarConcierge.newVehicle')}</Link>
              </ul>
            </li>
            <li class="nav-item me-4">
              <Link class="nav-link" to="/adminmessages">{t('navbarConcierge.messages')}</Link>
            </li>
            <li class="nav-item me-4">
              <Link class="nav-link" to="/configadmin">{t('navbarConcierge.config')}</Link>
            </li>
            <li class="nav-item me-4">
              <Link class="nav-link" to="/login" onClick={handleSignOut}>{t('navbarConcierge.signOut')}</Link>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarConcierge;
