import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 

const SearchPersonForm = () => {
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
      <h2>{t('searchPersonForm.searchByRut')}</h2>
      <div className="formGroup">
        <label htmlFor="rut">{t('searchPersonForm.rutLabel')}</label>
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
        {t('searchPersonForm.searchButton')}
      </button>
      {personData && (
        <div className="personInfo">
          <h3>{t('searchPersonForm.personFound')}</h3>
          <p><strong>{t('searchPersonForm.rut')}:</strong> {personData.rut}</p>
          <p><strong>{t('searchPersonForm.name')}:</strong> {personData.firstName} {personData.lastName}</p>
          <p><strong>{t('searchPersonForm.birthDate')}:</strong> {personData.birthDate}</p>
          <p><strong>{t('searchPersonForm.address')}:</strong> {personData.address}</p>
          <p><strong>{t('searchPersonForm.phone')}:</strong> {personData.phone}</p>
          <p><strong>{t('searchPersonForm.apartmentsVisited')}:</strong> {personData.apartments_visited}</p>
          <p><strong>{t('searchPersonForm.quantity')}:</strong> {personData.Quantity_of_visits}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPersonForm;
