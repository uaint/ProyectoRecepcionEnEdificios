import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from '../i18n';
import '../App.css';
import { updateTheme } from '../Utils';

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

  // Logout and delete all from local and session storage. Afterwards, redirect to login page.
  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleThemeChange = (mode) => {
    localStorage.setItem('theme', mode);

    const themeButtons = document.querySelectorAll('.theme-btn-group button');
    themeButtons.forEach(btn => {
        btn.classList.remove('btn-primary', 'btn-danger');
        btn.classList.add('btn-secondary');
    });

    const activeBtn = document.querySelector(`.theme-btn-group button[data-mode="${mode}"]`);
    activeBtn.classList.remove('btn-secondary');
    activeBtn.classList.add(mode === 'light' ? 'btn-primary' : 'btn-danger');
    updateTheme()
};



  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5 fixed-top">
      <div class="container-fluid">
        <div className="btn-group navbar-brand" role="group" style={navbarStyle}>
          <button
              type="button"
              className={`btn ${i18n.language === 'es' ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}`}
              onClick={() => handleLanguageChange('es') }
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
        <div className="btn-group navbar-brand theme-btn-group" role="group" style={navbarStyle}>
            <button
               type="button"
                 className={`btn btn-sm ${localStorage.getItem('theme') === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleThemeChange('light')}
                 data-mode="light"
            >
                ☀️
            </button>
            <button
               type="button"
               className={`btn btn-sm ${localStorage.getItem('theme') === 'dark' ? 'btn-danger' : 'btn-secondary'}`}
               onClick={() => handleThemeChange('dark')}
              data-mode="dark"
              >
                🌕
                </button>
          </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
          <li className="nav-item dropdown me-4">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('navbarConcierge.admin')}
              </a>
              <ul className="dropdown-menu" style={navbarStyle}>
              <Link className="nav-link" to="/admincorrespondence">{t('navbarConcierge.adminCorrespondence')}</Link>
              <Link className="nav-link" to="/adminvisits">{t('navbarConcierge.adminVisits')}</Link>
              <Link className="nav-link" to="/adminparking">{t('navbarConcierge.adminParking')}</Link>
              <Link className="nav-link" to="/adminvehicles">{t('navbarConcierge.adminVehicles')}</Link>
              </ul>
            </li>
            {/*
            <li className="nav-item dropdown me-4">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('navbarConcierge.searchPerson')}
              </a>
              <ul className="dropdown-menu" style={navbarStyle}>
                <li><Link className="dropdown-item" to="/searchpersonbyrut">{t('navbarConcierge.searchByRut')}</Link></li>
                <li><Link className="dropdown-item" to="/scanid">{t('navbarConcierge.scanID')}</Link></li>
              </ul>
            </li>
            */}
            <li className="nav-item dropdown me-4">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('navbarConcierge.new')}
              </a>
              <ul className="dropdown-menu" style={navbarStyle}>
              <Link className="nav-link" to="/scanid">{t('navbarConcierge.newVisit')}</Link>
              <Link className="nav-link" to="/newvehicleform">{t('navbarConcierge.newVehicle')}</Link>
              </ul>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/adminmessages">{t('navbarConcierge.messages')}</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" to="/configadmin">{t('navbarConcierge.config')}</Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item me-4 pull-right">
            <Link className="nav-link" to="/login" onClick={handleSignOut}>{t('navbarConcierge.signOut')}</Link>
          </li>
          </ul>
      </div>
    </nav>
  );
};

export default NavbarConcierge;
