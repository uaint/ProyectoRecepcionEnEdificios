import React, { useState } from 'react';
import './App.css'; // Importar estilos CSS específicos para este formulario

const SearchPersonForm = () => {
  const [rut, setRut] = useState('');
  const [personData, setPersonData] = useState(null);

  const handleSearch = () => {
    // Aquí puedes agregar la lógica para buscar la persona en la base de datos o en algún servicio
    // Por simplicidad, este ejemplo solo muestra un mensaje en la consola
    console.log('Search person with RUT:', rut);

    // Simulando una respuesta con datos de la persona encontrada
    const mockPersonData = {
      rut: rut,
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '01/01/1980',
      address: '123 Main St',
      phone: '555-123-4567',
      apartments_visited: '7A',
      Quantity_of_visits: 2,
    };
    setPersonData(mockPersonData);
  };

  return (
    <div className="formContainer">
      <h2>Search Person by RUT</h2>
      <div className="formGroup">
        <label htmlFor="rut">RUT:</label>
        <input
          type="text"
          id="rut"
          name="rut"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          required
          className="inputField"
        />
      </div>
      <button type="button" onClick={handleSearch} className="submitButton">
        Search
      </button>
      {personData && (
        <div className="personInfo">
          <h3>Person Found</h3>
          <p><strong>RUT:</strong> {personData.rut}</p>
          <p><strong>Name:</strong> {personData.firstName} {personData.lastName}</p>
          <p><strong>Birth Date:</strong> {personData.birthDate}</p>
          <p><strong>Address:</strong> {personData.address}</p>
          <p><strong>Phone:</strong> {personData.phone}</p>
          <p><strong>apartments visited:</strong> {personData.apartments_visited}</p>
          <p><strong>Quantity:</strong> {personData.Quantity_of_visits}</p>
        </div>
      )}
    </div>
  );
};

export default SearchPersonForm;
