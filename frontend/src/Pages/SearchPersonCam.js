import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../App.css';

const SearchPersonCam = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t('searchPersonCam.toDevelop')}</h3>
      <div className="searchButtonContainer">
        <Link to="/searchpersonform" className="submitButton searchButton">{t('searchPersonCam.searchByRut')}</Link>
      </div>
    </div>
  );
};

export default SearchPersonCam;
