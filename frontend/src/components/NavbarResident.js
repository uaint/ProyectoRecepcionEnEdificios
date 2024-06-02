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


  // Logout and delete all from local and session storage. Afterwards, redirect to login page.
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5 fixed-top">
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
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <Link className="nav-link" to="/adminvisits">{t('navbarResident.adminvisits')}</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/admincorrespondence">{t('navbarResident.adminCorrespondence')}</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/newfrequentvisitform">{t('navbarResident.newfrequentvisitform')}</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/newmessage">{t('navbarResident.newmessage')}</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/configadmin">{t('navbarResident.config')}</Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item me-4 pull-right">
            <Link className="nav-link" to="/login" onClick={handleSignOut}>{t('navbarResident.signOut')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarResident;
