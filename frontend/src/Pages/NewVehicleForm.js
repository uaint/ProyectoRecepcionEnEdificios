import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const NewVehicleForm = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    building: '',
    apartment: '',
    licensePlate: '',
    car: '',
    parking: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la solicitud ADD al servidor
    fetch(`https://dduhalde.online/.netlify/functions/api/add_vehicle/${formData.run}/${formData.license_plate}/${formData.parket_at}/${formData.parket_since}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar la corrrespondencia');
      }
      console.log(`Se agrego la corrrespondencia`);
    })
    .catch(error => {
      console.error('Error al agregar la corrrespondencia:', error);
    });
    
    setFormData({
      run: '',
      license_plate: '',
      parket_at: '',
      parket_since: '',
    });
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
                  <button type="submit" class="btn btn-primary mt-3">{t('vehicleForm.addVehicle')}</button>
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
