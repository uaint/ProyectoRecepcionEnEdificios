import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';

const NewVisitForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    run: '',
    birthDate: '',
    apartmentToVisit: '',
  });

  const [apartmentOptions, setApartmentOptions] = useState([
    '101', '202', '303' // Departamentos disponibles, puedes modificar estos valores
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApartmentChange = (e) => {
    const selectedApartment = e.target.value;
    setFormData({ ...formData, apartmentToVisit: selectedApartment });
  };

  const handleSelectAllChange = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar los datos del formulario
    console.log('Form submitted:', formData);
    // Resetear el formulario después de enviar los datos
    setFormData({
      firstName: '',
      lastName: '',
      run: '',
      birthDate: '',
      apartmentToVisit: '',
    });
  };

  return (
    <div className="formContainer">
      <h2>{t('visitForm.addNewVisit')}</h2>
      <form onSubmit={handleSubmit} className="visitForm">
        <div className="formGroup">
          <label htmlFor="firstName">{t('visitForm.firstName')}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lastName">{t('visitForm.lastName')}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="run">{t('visitForm.run')}</label>
          <input
            type="text"
            id="run"
            name="run"
            value={formData.run}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="birthDate">{t('visitForm.birthDate')}</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="apartmentToVisit">{t('visitForm.apartmentToVisit')}</label>
          <select
            id="apartmentToVisit"
            name="apartmentToVisit"
            value={formData.apartmentToVisit}
            onChange={handleApartmentChange}
            required
            className="inputField"
          >
            <option value="" disabled hidden>{t('visitForm.selectApartment')}</option>
            {apartmentOptions.map((apartment, index) => (
              <option key={index} value={apartment}>
                {apartment}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submitButton">{t('visitForm.addVisit')}</button>
      </form>
    </div>
  );
};

export default NewVisitForm;
