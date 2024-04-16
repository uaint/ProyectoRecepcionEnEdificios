import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import axios from 'axios';

function obtenerFecha(fecha) {
  const fechaActual = new Date();
  const fechaDada = new Date(fecha);

  const hora = String(fechaDada.getHours()).padStart(2, '0');
  const minutos = String(fechaDada.getMinutes()).padStart(2, '0');

  if (
    fechaActual.getFullYear() === fechaDada.getFullYear() &&
    fechaActual.getMonth() === fechaDada.getMonth() &&
    fechaActual.getDate() === fechaDada.getDate()
  ) {
    return `hoy a las ${hora}:${minutos}`;
  } else {
    // Formatear la fecha en formato "dd/mm/yyyy"
    const dia = String(fechaDada.getDate()).padStart(2, '0');
    const mes = String(fechaDada.getMonth() + 1).padStart(2, '0');
    const año = fechaDada.getFullYear();
    return `el día ${dia}/${mes}/${año} a las ${hora}:${minutos}`;
  }
}

const NewCorrespondenceForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    type: '',
    timeArrival: '',
    isClaimed: false,
    apartment: '',
    inhabitant: '',
  });

  const [selectedOption, setSelectedOption] = useState(t('correspondenceForm.type'));
  const [apartmentOptions, setApartmentOptions] = useState([]);
  const [sendToAllResidents, setSendToAllResidents] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const fechamsg = obtenerFecha(formData.timeArrival);

  // Simulación de datos de apartamentos y habitantes
  const apartmentData = [
    { id: 1, name: '101', inhabitants: ['Juan Pérez', 'María González'] },
    { id: 2, name: '202', inhabitants: ['Pedro López', 'Ana Martínez'] },
    { id: 3, name: '303', inhabitants: ['Sofía Rodríguez', 'Carlos Ruiz'] },
  ];

  // Función para manejar el cambio en la selección del apartamento
  const handleApartmentChange = (e) => {
    const selectedApartment = e.target.value;
    const selectedApartmentData = apartmentData.find((apartment) => apartment.name === selectedApartment);
    setApartmentOptions(selectedApartmentData.inhabitants);
    setFormData({ ...formData, apartment: selectedApartment });
  };

  // Función para manejar el cambio en la selección del habitante
  const handleInhabitantChange = (e) => {
    const selectedInhabitant = e.target.value;
    setFormData({ ...formData, inhabitant: selectedInhabitant });
  };

  // Función para manejar el cambio en el checkbox "Send to all residents"
  const handleSendToAllResidentsChange = (e) => {
    setSendToAllResidents(e.target.checked);
  };

  return (
    <div className="formContainer">
      <h2>{t('correspondenceForm.addNewCorrespondence')}</h2>
      <form className="correspondenceForm">
        <div className="formGroup">
          <div className="options-container">
            <select className="type-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="" disabled hidden>{t('correspondenceForm.type')}</option>
              <option value="Packages">{t('correspondenceForm.packages')}</option>
              <option value="Letters">{t('correspondenceForm.letters')}</option>
              <option value="Item">{t('correspondenceForm.item')}</option>
              <option value="Others">{t('correspondenceForm.others')}</option>
            </select>
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="timeArrival">{t('correspondenceForm.timeOfArrival')}</label>
          <input
            type="datetime-local"
            id="timeArrival"
            name="timeArrival"
            value={formData.timeArrival}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="apartment">{t('correspondenceForm.selectApartment')}</label>
          <select
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleApartmentChange}
            required
            className="inputField"
          >
            <option value="" disabled hidden>{t('correspondenceForm.selectApartment')}</option>
            {apartmentData.map((apartment) => (
              <option key={apartment.id} value={apartment.name}>
                {apartment.name}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="inhabitant">{t('correspondenceForm.selectInhabitant')}</label>
          <select
            id="inhabitant"
            name="inhabitant"
            value={formData.inhabitant}
            onChange={handleInhabitantChange}
            required
            className="inputField"
          >
            <option value="" disabled hidden>{t('correspondenceForm.selectInhabitant')}</option>
            {apartmentOptions.map((inhabitant, index) => (
              <option key={index} value={inhabitant}>
                {inhabitant}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <input
            type="checkbox"
            id="sendToAllResidents"
            name="sendToAllResidents"
            checked={sendToAllResidents}
            onChange={handleSendToAllResidentsChange}
          />
          <label htmlFor="sendToAllResidents">{t('correspondenceForm.checkboxSendToAll')}</label>
        </div>
        <button type="submit" className="submitButton">{t('correspondenceForm.addCorrespondence')}</button>
      </form>
    </div>
  );
};

export default NewCorrespondenceForm;
