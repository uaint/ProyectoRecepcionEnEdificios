import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { timeAlerts, timeRedirect } from '../Utils.js';

const NewFrequentVisitForm = () => {

  // General configurations
  const { t } = useTranslation();
  
  // Read variables from sessionStorage
  const storedTowerId = sessionStorage.getItem('tower_id_associated');
  const storedApartmentId = sessionStorage.getItem('apartment_id_associated');
  
  // Initiate formData, only default value for Type
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    run: '',
    dv: '',
    birthDate: '',
    buildToVisit: storedTowerId,
    apartmentToVisit: storedApartmentId
  });

  // Function to handle changes in options of formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Show alerts
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFaildAlert, setShowFaildAlert] = useState(false);

  // Submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call API to add visitor
    fetch(`https://dduhalde.online/.netlify/functions/api/new_frequent_visit/${formData.firstName}/${formData.lastName}/${formData.run}/${formData.dv}/${formData.birthDate}/${formData.apartmentToVisit}/${formData.buildToVisit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occured trying to add a visitor.');
      }
      setShowSuccessAlert(true);
      timeAlerts(() => setShowSuccessAlert(false));
      timeRedirect('/adminvisits');
    })
    .catch(error => {
      setShowFaildAlert(true)
      timeAlerts(() => setShowFaildAlert(false));
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
              <h2 className="card-title">{t('frequentVisitForm.addNewFrequentVisit')}</h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="firstName" class="form-label">{t('frequentVisitForm.firstName')}</label>
                  <input type="text" class="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} onKeyDown={handleKeyPress} required />
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">{t('frequentVisitForm.lastName')}</label>
                  <input type="text" class="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} onKeyDown={handleKeyPress} required />
                </div>
                <div class="mb-3">
                  <label for="run" class="form-label">{t('frequentVisitForm.run')}</label>
                  <input type="number" class="form-control" id="run" name="run" value={formData.run} onChange={handleChange} required placeholder={t('frequentVisitForm.rutPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="dv" class="form-label">{t('frequentVisitForm.dv')}</label>
                  <input type="number" min="0" max="9" class="form-control" id="dv" name="dv" value={formData.dv} onChange={handleChange} required placeholder={t('frequentVisitForm.dvPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="birthDate" class="form-label">{t('frequentVisitForm.birthDate')}</label>
                  <input type="date" class="form-control" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required/>
                </div>
                <div class="mb-3">
                  <label for="apartmentToVisit" class="form-label">{t('frequentVisitForm.apartmentToVisit')}</label>
                  <input type="number" class="form-control" id="apartmentToVisit" name="apartmentToVisit" value={formData.apartmentToVisit} onChange={handleChange} required disabled/>
                </div>
                <div class="mb-3">
                  <label for="buildToVisit" class="form-label">{t('frequentVisitForm.buildToVisit')}</label>
                  <input type="number" class="form-control" id="buildToVisit" name="buildToVisit" value={storedTowerId} onChange={handleChange} required disabled/>
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3">{t('frequentVisitForm.addVisit')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showSuccessAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('visitForm.SuccessAlert')}
          </div>
          )}
          {showFaildAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('visitForm.FailAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewFrequentVisitForm;
