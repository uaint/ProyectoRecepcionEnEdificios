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
    // Aquí puedes agregar la lógica para manejar los datos del formulario
    console.log('Form submitted:', formData);
    // Resetear el formulario después de enviar los datos
    setFormData({
      name: '',
      lastName: '',
      building: '',
      apartment: '',
      licensePlate: '',
      car: '',
      parking: '',
    });
  };

  return (
    <div className="formContainer">
      <h2>{t('vehicleForm.addNewVehicle')}</h2>
      <form onSubmit={handleSubmit} className="vehicleForm">
        <div className="formGroup">
          <label htmlFor="name">{t('vehicleForm.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lastName">{t('vehicleForm.lastName')}</label>
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
          <label htmlFor="building">{t('vehicleForm.building')}</label>
          <input
            type="text"
            id="building"
            name="building"
            value={formData.building}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="apartment">{t('vehicleForm.apartment')}</label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="licensePlate">{t('vehicleForm.licensePlate')}</label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="car">{t('vehicleForm.car')}</label>
          <input
            type="text"
            id="car"
            name="car"
            value={formData.car}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="parking">{t('vehicleForm.parking')}</label>
          <input
            type="text"
            id="parking"
            name="parking"
            value={formData.parking}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <button type="submit" className="submitButton">{t('vehicleForm.addVehicle')}</button>
      </form>
    </div>
  );
};

export default NewVehicleForm;
