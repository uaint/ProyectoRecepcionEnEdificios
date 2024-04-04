import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const SearchPersonCam = () => {
  return (
    <div>
      <h1>Aqui va la busqueda de datos por camara automatico</h1>
      <h2>Nombre, Apellido, Rut, Fecha de nacimiento, etc.</h2>
      <h3>To be developed...</h3>
      <div className="searchButtonContainer">
        <Link to="/searchpersonform" className="submitButton searchButton">Buscar por RUT</Link>
      </div>
    </div>
  );
};

export default SearchPersonCam;
