import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { timeAlerts, timeRedirect } from '../Utils.js';


const NewVehicleForm = () => {

  // General configurations
  const { t } = useTranslation();
  
  // Initiate formData empty
  const [formData, setFormData] = useState({
    run: '',
    dv: '',
    license_plate: ''
  });

  // Get the user_role from the sessionStorage
  const user_role = sessionStorage.getItem('user_role');

  // Create alerts
  const [showAddedVehicleAlert, setShowAddedVehicleAlert] = useState(false);
  const [showAddedVehicleFailAlert, setShowAddedVehicleFailAlert] = useState(false);

  // Update formData according to input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit button, add vehicle and restart formData
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do the ADD request to the server. Add vehicle according to the specified parameters
    fetch(`https://dduhalde.online/.netlify/functions/api/add_vehicle/${formData.run}/${formData.license_plate}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occured trying to add the vehicle.');
      }
      setShowAddedVehicleAlert(true);
        timeAlerts(() => setShowAddedVehicleAlert(false));
        timeRedirect('/adminparking');
    })
    .catch(error => {
      console.error('An error occurred while trying to fetch the vehicles:', error);
      setShowAddedVehicleFailAlert(true);
        timeAlerts(() => setShowAddedVehicleFailAlert(false));
    });
  };

  return (
    <div id="change" className="container">
      {user_role !== '3' && (
      <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{t('vehicleForm.addNewVehicle')}</h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="run" class="form-label">{t('vehicleForm.run')}</label>
                  <input type="number" class="form-control" id="run" name="run" value={formData.run} onChange={handleChange} required placeholder={t('vehicleForm.rutPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="dv" class="form-label">{t('vehicleForm.dv')}</label>
                  <input type="number" class="form-control" id="dv" name="dv" value={formData.dv} onChange={handleChange} required placeholder={t('vehicleForm.dvPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="license_plate" class="form-label">{t('vehicleForm.licensePlate')}</label>
                  <input type="text" class="form-control" id="license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} required/>
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3">{t('vehicleForm.addVehicle')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showAddedVehicleAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('vehicleForm.SuccessAlert')}
          </div>
          )}
          {showAddedVehicleFailAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('vehicleForm.FailAlert')}
          </div>
          )}
        </div>
      </div>
      </div>
      )}
    </div>
  );
};

export default NewVehicleForm;
