import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchPersonByRut = () => {
  const { t } = useTranslation();
  const [rut, setRut] = useState('');
  const [personData, setPersonData] = useState(null);

  const handleSearch = () => {
    // Simulando una respuesta con datos de la persona encontrada
    const mockPersonData = {
      rut: rut,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '01/01/1980',
      address: '123 Main St',
      phone: '555-123-4567',
      apartments_visited: '7A',
      Quantity_of_visits: 2,
    };
    setPersonData(mockPersonData);
  };

  return (
    <div className="formContainer">
      <h2>{t('SearchPersonByRut.searchByRut')}</h2>
      <div className="formGroup">
        <label htmlFor="rut">{t('SearchPersonByRut.rutLabel')}</label>
        <input
          type="text"
          id="rut"
          name="rut"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
          className="inputField"
        />
      </div>
      <button type="button" onClick={handleSearch} className="submitButton">
        {t('SearchPersonByRut.searchButton')}
      </button>
      {personData && (
        <div className="personInfo">
          <h3>{t('SearchPersonByRut.personFound')}</h3>
          <p><strong>{t('SearchPersonByRut.rut')}:</strong> {personData.rut}</p>
          <p><strong>{t('SearchPersonByRut.name')}:</strong> {personData.firstName} {personData.lastName}</p>
          <p><strong>{t('SearchPersonByRut.birthDate')}:</strong> {personData.birthDate}</p>
          <p><strong>{t('SearchPersonByRut.address')}:</strong> {personData.address}</p>
          <p><strong>{t('SearchPersonByRut.phone')}:</strong> {personData.phone}</p>
          <p><strong>{t('SearchPersonByRut.apartmentsVisited')}:</strong> {personData.apartments_visited}</p>
          <p><strong>{t('SearchPersonByRut.quantity')}:</strong> {personData.Quantity_of_visits}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPersonByRut;
