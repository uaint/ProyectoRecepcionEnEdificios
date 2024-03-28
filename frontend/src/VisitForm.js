import React, { useState } from 'react';
import './App.css'; 

const VisitForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    run: '',
    runVd: '',
    birthDate: '',
    visitAmount: '',
    visitType: '',
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
      firstName: '',
      lastName: '',
      run: '',
      runVd: '',
      birthDate: '',
      visitAmount: '',
      visitType: '',
    });
  };

  return (
    <div className="formContainer">
      <h2>Add New Visit</h2>
      <form onSubmit={handleSubmit} className="visitForm">
        <div className="formGroup">
          <label htmlFor="firstName">First Name:</label>
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
          <label htmlFor="lastName">Last Name:</label>
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
          <label htmlFor="run">RUT:</label>
          <input
            type="text"
            id="run"
            name="run"
            value={formData.run}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="birthDate">Birth Date:</label>
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
          <label htmlFor="aptToVisit">Apartment to Visit: </label>
          <input
            type="text"
            id="aptToVisit"
            name="aptToVisit"
            value={formData.aptToVisit}
            onChange={handleChange}
            required
            className="inputField"
          />
        </div>
        <button type="submit" className="submitButton">Add Visit</button>
      </form>
    </div>
  );
};

export default VisitForm;
