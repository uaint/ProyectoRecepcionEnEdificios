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
const NavbarResident = () => {
  const { t } = useTranslation();
  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
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
            <li class="nav-item">
              <Link class="nav-link" to="/notifications">{t('navbarResident.notifications')}</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/adminvisits">{t('navbarResident.adminVisits')}</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/messages">{t('navbarResident.messages')}</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/config">{t('navbarResident.config')}</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/home">{t('navbarResident.signOut')}</Link>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarResident;
