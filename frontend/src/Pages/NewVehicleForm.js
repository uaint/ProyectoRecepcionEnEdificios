import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const NewVehicleForm = () => {

  // General configurations
  const { t } = useTranslation();
  
  // Initiate formData empty
  const [formData, setFormData] = useState({
    run: '',
    license_plate: '',
    parket_at: '',
    parket_since: '',
  });

  // Update formData according to input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit button, add vehicle and restart formData
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do the ADD request to the server. Add vehicle according to the specified parameters
    fetch(`https://dduhalde.online/.netlify/functions/api/add_vehicle/${formData.run}/${formData.license_plate}/${formData.parket_at}/${formData.parket_since}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occured trying to add the vehicle.');
      }
      console.log(`Vehicle added successfully.`);
    })
    .catch(error => {
      console.error('An error occured trying to add the vehicle:', error);
    });
    
    // Reset formData
    setFormData({
      run: '',
      license_plate: '',
      parket_at: '',
      parket_since: '',
    });
  };

  const redirectUser = () => {
    // Verify if all required fields are filled
    const { run, license_plate, parket_at, parket_since } = formData;
    if (run && license_plate && parket_at && parket_since) {
      // Redirect to adminparking if all fields are filled
      window.location.href = '/adminparking';
    } else {
      alert('Please fill all the required fields before adding the vehicle.');
    }
  };
  

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{t('vehicleForm.addNewVehicle')}</h2>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="run" class="form-label">{t('vehicleForm.run')}</label>
                  <input type="text" class="form-control" id="run" name="run" value={formData.run} onChange={handleChange} required placeholder={t('vehicleForm.rutPlaceholder')}/>
                </div>
                <div class="mb-3">
                  <label for="license_plate" class="form-label">{t('vehicleForm.licensePlate')}</label>
                  <input type="text" class="form-control" id="license_plate" name="license_plate" value={formData.license_plate} onChange={handleChange} required/>
                </div>
                <div class="mb-3">
                  <label for="parket_at" class="form-label">{t('vehicleForm.parking')}</label>
                  <input type="text" class="form-control" id="parket_at" name="parket_at" value={formData.parket_at} onChange={handleChange} required/>
                </div>
                <div class="mb-3">
                  <label for="parket_since" class="form-label">{t('vehicleForm.parkedSince')}</label>
                  <input type="date" class="form-control" id="parket_since" name="parket_since" value={formData.parket_since} onChange={handleChange} required/>
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3" onClick={redirectUser}>{t('vehicleForm.addVehicle')}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVehicleForm;
