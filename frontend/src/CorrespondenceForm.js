import React, { useState } from 'react';
import './App.css'; // Importar estilos CSS específicos para este formulario

const AddCorrespondenceForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    timeArrival: '',
    isClaimed: false,
    inhabitantId: '',
  });

  const [language, setLanguage] = useState('es'); // Estado para el idioma actual

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario a la base de datos
    console.log('Form submitted:', formData);
    // Resetear el formulario después de enviar los datos
    setFormData({
      type: '',
      timeArrival: '',
      isClaimed: false,
      inhabitantId: '',
    });
  };

  const handleLanguageChange = () => {
    setLanguage(language === 'es' ? 'en' : 'es'); // Cambiar el idioma al hacer clic en el botón
  };

  return (
    <div className="formContainer">
      <h2>{language === 'es' ? 'Agregar Nueva Correspondencia' : 'Add New Correspondence'}</h2>
      <form onSubmit={handleSubmit} className="correspondenceForm">
        <div className="formGroup">
          <label htmlFor="type">{language === 'es' ? 'Tipo: ' : 'Type: '}</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="timeArrival">{language === 'es' ? 'Fecha de Llegada: ' : 'Time of Arrival: '}</label>
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
          <label htmlFor="inhabitantId">{language === 'es' ? 'ID del Habitante: ' : 'Inhabitant ID: '}</label>
          <input
            type="text"
            id="inhabitantId"
            name="inhabitantId"
            value={formData.inhabitantId}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <button type="submit" className="submitButton">
          {language === 'es' ? 'Agregar Correspondencia' : 'Add Correspondence'}
        </button>
       

      </form>
    </div>
  );
};

export default AddCorrespondenceForm;


