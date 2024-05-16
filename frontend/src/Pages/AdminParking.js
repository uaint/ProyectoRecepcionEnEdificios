import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormParking from '../components/FormParking';
import InfoParking from '../components/InfoParking';
import { formatDate } from '../Utils.js';

const AdminParking = () => {

  // General configurations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Initiate/Create parked vehicles
  const [parking, setParking] = useState([]);

  // Fetch visitors data through the API
  useEffect(() => {
    fetch('https://dduhalde.online/.netlify/functions/api/parked')
      .then(response => response.json())
      .then(data => setParking(data))
      .catch(error => console.error('Error fetching visitors:', error));
  }, []);

  // Función para inicializar los colores de los botones según los estacionamientos utilizados
  useEffect(() => {
    parking.forEach(parking_ => {
        const button = document.getElementById(parking_.parked_at);
        if (button) {
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            button.addEventListener("click", () => showInfo(parking_));
          };
    });
  }, [parking]);

  const [showForm, setShowForm] = useState(false);
  const [selectedParkingId, setSelectedParkingId] = useState(null);

  const HandleShowForm = (parkingId) => {
        setShowForm(true);
        setSelectedParkingId(parkingId);
  };

  // Funcion para el boton de mostrar informacion
  function showInfo(data) {
      // Mostrar la información adicional en algún lugar de la página
      const infoContainer = document.getElementById('info-container');
      infoContainer.innerHTML = `
          <div class="container">
              <div class="row justify-content-center">
                  <div class="col-md-6">
                      <div class="card">
                          <div class="card-body">
                              <h2 class="card-title mb-3">${data.full_name}</h2>
                              <p class="card-text">License Plate: ${data.license_plate}</p>
                              <p class="card-text">Parked Since: ${formatDate(data.parked_since)}</p>
                              <div class="d-grid gap-1">
                                  <button type="submit" class="btn btn-warning" onclick="freeparking(${data.parked_at})">Free Parking</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  }

  function freeparking(parked_at) {
      console.log("bait", parked_at)
  }

  const handleDelete = (plate) => {
    // Realizar la solicitud DELETE al servidor, para eliminar vehiculo con su pantente
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_vehicle/${plate}`)
    }

  // Boton para redireccionar a agregar nuevo vehiculo
  const handleButtonClick = () => {
      navigate('/newVehicleForm');
  };

  return (
      <div id="change" class="container">
          <h1 class="text-center mb-4">{t('adminParking.adminParking')}</h1>
          <hr class="mb-5"/>
          <div class="container text-center mt-3">
              <div class="btn-group-vertical p-0 my-5" role="group" aria-label="Vertical button group">
                  <div class="btn-group p-0 m-0" role="group" aria-label="First group">
                      <button id="1" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(1)}>1</button>
                      <button id="2" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(2)}>2</button>
                      <button id="3" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(3)}>3</button>
                      <button id="4" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(4)}>4</button>
                  </div>
                  <div class="btn-group p-0 m-0" role="group" aria-label="Second group">
                      <button id="5" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(5)}>5</button>
                      <button id="6" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(6)}>6</button>
                      <button id="7" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(7)}>7</button>
                      <button id="8" type="button" class="btn btn-success p-5 fs-1 m-0 border-4 border-warning" onClick={() => HandleShowForm(8)}>8</button>
                  </div>
              </div>
          </div>
          <div id="info-container" class="container mt-2 mb-5">
          {showForm && <FormParking parkingId={selectedParkingId} />} {/* Mostrar el formulario solo si showForm es true */}
          </div>
      </div>
  );
};

export default AdminParking;