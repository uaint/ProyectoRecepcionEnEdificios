import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormParking from '../components/FormParking';
import InfoParking from '../components/InfoParking';

const AdminParking = () => {

  // General configurations
  const { t } = useTranslation();

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
        const newButton = document.createElement("button");
        newButton.id = parking_.parked_at;
        newButton.type = "button";
        newButton.className = "btn btn-danger p-5 fs-1 m-0 border-4 border-warning";
        newButton.textContent = parking_.parked_at;
        newButton.addEventListener("click", () => HandleShowInfo(parking_));
        button.parentNode.replaceChild(newButton, button);
      }
    });
  }, [parking]);

  const [showForm, setShowForm] = useState(false);
  const [selectedParkingId, setSelectedParkingId] = useState(null);

  const HandleShowForm = (parkingId) => {
      setShowInfo(false);
      setSelectedParkingId(parkingId);
      setShowForm(true);
  };

  const [showInfo, setShowInfo] = useState(false);
  const [selectedParkingData, setSelectedParkingData] = useState(null);

  const HandleShowInfo = (parking_) => {
    setShowForm(false);
    setSelectedParkingData(parking_);
    setShowInfo(true);
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
            { showForm && <FormParking parkingId={selectedParkingId} /> }
            { showInfo && <InfoParking data={selectedParkingData} /> }
          </div>
      </div>
  );
};

export default AdminParking;