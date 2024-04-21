import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const NewVisitForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    run: '',
    dv: '',
    birthDate: '',
    buildToVisit: '',
    apartmentToVisit: '',
    type: 'Frequent',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Actualiza el estado de la opción seleccionada
    setFormData({ ...formData, type: selectedValue }); // Actualiza el formData con el nuevo valor seleccionado
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://dduhalde.online/.netlify/functions/api/add_visitor/${formData.firstName}/${formData.lastName}/${formData.run}/${formData.dv}/${formData.birthDate}/${formData.buildToVisit}/${formData.apartmentToVisit}/${formData.type}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar la visitante');
      }
      console.log(`Se agrego la visitante`);
    })
    .catch(error => {
      console.error('Error al agregar la visitante:', error);
    });
    
    // Resetear el formulario después de enviar los datos
    setFormData({
      firstName: '',
      lastName: '',
      run: '',
      dv: '',
      birthDate: '',
      buildToVisit: '',
      apartmentToVisit: '',
      type: 'Frequent',
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
            placeholder={t('visitForm.rutPlaceholder')}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="dv">{t('visitForm.dv')}</label>
          <input
            type="text"
            id="dv"
            name="dv"
            value={formData.dv}
            onChange={handleChange}
            required
            className="inputField"
            placeholder={t('visitForm.dvPlaceholder')}
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
          <input
            type="text"
            id="apartmentToVisit"
            name="apartmentToVisit"
            value={formData.apartmentToVisit}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="buildToVisit">{t('visitForm.buildToVisit')}</label>
          <input
            type="text"
            id="buildToVisit"
            name="buildToVisit"
            value={formData.buildToVisit}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
        <label htmlFor="type">{t('visitForm.type')}</label>
          <div className="options-container">
            <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
              <option value="Frequent">{t('visitForm.frequent')}</option>
              <option value="Regular">{t('visitForm.regular')}</option>
              <option value="Social">{t('visitForm.social')}</option>
              <option value="Delivery">{t('visitForm.delivery')}</option>
              <option value="Medical">{t('visitForm.medical')}</option>
              <option value="Business">{t('visitForm.business')}</option>
              <option value="Others">{t('visitForm.others')}</option>
            </select>
          </div>
        </div>
        <button type="submit" className="submitButton">{t('visitForm.addVisit')}</button>
      </form>
    </div>
  );
};

export default NewVisitForm;
