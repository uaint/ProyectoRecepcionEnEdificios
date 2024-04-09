import React, { useState } from 'react';
import '../App.css'; 

const NewVisitForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    run: '',
    runVd: '',
    birthDate: '',
    visitAmount: '',
    visitType: '',
    apartmentToVisit: '', // Renombré el campo a "apartmentToVisit"
  });

  const [apartmentOptions, setApartmentOptions] = useState([
    '101', '202', '303' // Departamentos disponibles, puedes modificar estos valores
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApartmentChange = (e) => {
    const selectedApartment = e.target.value;
    setFormData({ ...formData, apartmentToVisit: selectedApartment });
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
      apartmentToVisit: '', // También reseteamos el valor del nuevo campo
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
          <label htmlFor="apartmentToVisit">Apartment to Visit:</label>
          <select
            id="apartmentToVisit"
            name="apartmentToVisit"
            value={formData.apartmentToVisit}
            onChange={handleApartmentChange}
            required
            className="inputField"
          >
            <option value="" disabled hidden>Select Apartment</option>
            {apartmentOptions.map((apartment, index) => (
              <option key={index} value={apartment}>
                {apartment}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submitButton">Add Visit</button>
      </form>
    </div>
  );
};

export default NewVisitForm;
