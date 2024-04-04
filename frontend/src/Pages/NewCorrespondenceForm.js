import React, { useState } from 'react';
import '../App.css'; // Importar estilos CSS específicos para este formulario

const NewCorrespondenceForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    timeArrival: '',
    isClaimed: false,
    inhabitantId: '',
  });

  const [selectedOption, setSelectedOption] = useState('Type');

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

  return (
    <div className="formContainer">
      <h2>Add New Correspondence</h2>
      <form onSubmit={handleSubmit} className="correspondenceForm">
        <div className="formGroup">
          <div className="options-container">
            <select className="type-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="Type" disabled hidden>Type</option>
              <option value="Packages">Packages</option>
              <option value="Letters">Letters</option>
              <option value="Item">Item</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="timeArrival">Time of Arrival:</label>
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
          <label htmlFor="inhabitantId">Inhabitant ID:</label>
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
        <button type="submit" className="submitButton">Add Correspondence</button>
      </form>
    </div>
  );
};

export default NewCorrespondenceForm;
