import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
const SearchPersonByRut = () => {

  // Receive translations
  const { t } = useTranslation();

  // Create rut & personData
  const [rut, setRut] = useState('');
  const [personData, setPersonData] = useState(null);
  const [showData, setShowData] = useState(false);

  const handleSearch = () => {
    // Simulate data with a mock person
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
    setShowData(true); 
  };

  const handleKeyPress = (e) => {
    const isAdmittedChar = /^[0-9.-]$/.test(e.key); // Number, dot or dash
    const isBackspace = e.key === 'Backspace'; // Backspace
  
    // Only allow backspace and the allowed characters
    if (!isAdmittedChar && !isBackspace) {
      e.preventDefault();
    }
  }

  return (
    <div className="formContainer d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4">
        <h3 className="mb-4 text-center">{t('SearchPersonByRut.searchByRut')}</h3>
        <div className="form-group row justify-content-center">
          <label htmlFor="rut" className="col-auto col-form-label">{t('SearchPersonByRut.rutLabel')}</label>
          <div className="col-auto">
            <input
              type="text"
              id="rut"
              name="rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              onKeyDown={handleKeyPress}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <button type="button" onClick={handleSearch} className="btn btn-primary">
            {t('SearchPersonByRut.searchButton')}
          </button>
        </div>
        {showData && personData && (
          <div className="personInfo mt-4 border p-4">
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
    </div>
  );
};

export default SearchPersonByRut;
