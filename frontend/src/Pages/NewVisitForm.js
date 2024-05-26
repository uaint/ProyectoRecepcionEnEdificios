import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const NewVisitForm = () => {

  // General configurations
  const { t } = useTranslation();
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Obtener los parámetros de la URL
  const scannedData = {
    firstName: queryParams.get('firstName') || '',
    lastName: queryParams.get('lastName') || '',
    run: queryParams.get('run') || '',
    dv: queryParams.get('dv') || '',
  };
  
  // Initiate formData, only default value for Type
  const [formData, setFormData] = useState({
    firstName: scannedData.firstName,
    lastName: scannedData.lastName,
    run: scannedData.run,
    dv: scannedData.dv,
    birthDate: '',
    buildToVisit: '',
    apartmentToVisit: '',
    type: 'Frequent',
  });
  
  // Update type according to selected option
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Update status of the selected option
    setFormData({ ...formData, type: selectedValue }); // Update formData with the new selected value
  };

  // Function to handle changes in options of formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call API to add visitor
    fetch(`https://dduhalde.online/.netlify/functions/api/add_visitor/${formData.firstName}/${formData.lastName}/${formData.run}/${formData.dv}/${formData.birthDate}/${formData.buildToVisit}/${formData.apartmentToVisit}/${formData.type}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occured trying to add a visitor.');
      }
      console.log(`Visitor added successfully.`);
    })
    .catch(error => {
      console.error('An error occured trying to add a visitor:', error);
    });
    
    // Reset formData
    setFormData({
      firstName: '',
      lastName: '',
      run: '',
      dv: '',
      birthDate: '',
      buildToVisit: '',
      apartmentToVisit: '',
      type: 'Casual',
    });
  };

  // Check for certain characters
  const handleKeyPress = (e) => {
    const admittedChars = /^[a-zA-Z\s]+$/.test(e.key);
    const isBackspace = e.key === 'Backspace'; // Backspace
    if (!admittedChars && !isBackspace) {
      e.preventDefault();
    }
  }

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{t('visitForm.addNewVisit')}</h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="firstName" class="form-label">{t('visitForm.firstName')}</label>
                  <input type="text" class="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} onKeyDown={handleKeyPress} required />
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">{t('visitForm.lastName')}</label>
                  <input type="text" class="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} onKeyDown={handleKeyPress} required />
                </div>
                <div class="mb-3">
                  <label for="run" class="form-label">{t('visitForm.run')}</label>
                  <input type="number" class="form-control" id="run" name="run" value={formData.run} onChange={handleChange} required placeholder={t('visitForm.rutPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="dv" class="form-label">{t('visitForm.dv')}</label>
                  <input type="number" min="0" max="9" class="form-control" id="dv" name="dv" value={formData.dv} onChange={handleChange} required placeholder={t('visitForm.dvPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="birthDate" class="form-label">{t('visitForm.birthDate')}</label>
                  <input type="date" class="form-control" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required/>
                </div>
                <div class="mb-3">
                  <label for="apartmentToVisit" class="form-label">{t('visitForm.apartmentToVisit')}</label>
                  <input type="number" class="form-control" id="apartmentToVisit" name="apartmentToVisit" value={formData.apartmentToVisit} onChange={handleChange} required/>
                </div>
                <div class="mb-3">
                  <label for="buildToVisit" class="form-label">{t('visitForm.buildToVisit')}</label>
                  <input type="number" class="form-control" id="buildToVisit" name="buildToVisit" value={formData.buildToVisit} onChange={handleChange} required/>
                </div>
                <label for="type" class="form-label">{t('visitForm.type')}</label>
                <select class="form-select" aria-label="Default select example" value={selectedOption} onChange={handleOptionChange}>
                  <option value="Casual">{t('visitForm.casual')}</option>
                  <option value="Regular">{t('visitForm.regular')}</option>
                  <option value="Social">{t('visitForm.social')}</option>
                  <option value="Delivery">{t('visitForm.delivery')}</option>
                  <option value="Medical">{t('visitForm.medical')}</option>
                  <option value="Business">{t('visitForm.business')}</option>
                  <option value="Others">{t('visitForm.others')}</option>
                </select>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3">{t('visitForm.addVisit')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVisitForm;
