import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../App.css';

const SearchPersonCam = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="centerContainer">
        <h2 className="pageTitle">{t('searchPersonCam.title')}</h2>
        <Link to="/searchpersonform" className="submitButton searchButton">{t('searchPersonCam.searchByRut')}</Link>
        <button className="submitButton scanButton">{t('searchPersonCam.scanID')}</button>
      </div>
    </div>
  );
};

export default SearchPersonCam;
