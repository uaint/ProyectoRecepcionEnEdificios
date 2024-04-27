import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WhatsAppMsg, timeAlerts } from '../Utils.js';

const NewCorrespondenceForm = () => {

  // Configuraciones generales
  const { t } = useTranslation();

  // Se inicia formData con algunos valores "predeterminados"
  const [formData, setFormData] = useState({
    type: 'Packages',
    timeOfArrival: '',
    isClaimed: false,
    apartment: '',
    build: '',
  });

  // Actualizar type segun opcion que se elige
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Actualiza el estado de la opción seleccionada
    setFormData({ ...formData, type: selectedValue }); // Actualiza el formData con el nuevo valor seleccionado
  };

  // Funcion para ver cambios en las opciones de formData
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // Ver que parte del form mostrar, si primera o segunda
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [showCorrespondenceForm, setShowCorrespondenceForm] = useState(false);

  // Buscan personas con la api, segun edificio y departamento, para ver a quienes enviar mensajes
  const [selectedInhabitants, setSelectedInhabitants] = useState([]);
  const [inhabitants, setInhabitants] = useState([]);

  // Mostrar o no las alertas
  const [showMsgSuccessAlert, setShowMsgSuccessAlert] = useState(false);
  const [showMsgFaildAlert, setShowMsgFaildAlert] = useState(false);
  const [showInhabitantsFaildAlert, setShowInhabitantsFaildAlert] = useState(false);
  const [showNoInhabitantsAlert, setShowNoInhabitantsAlert] = useState(false);

  const handleSearch = () => {
    const url_api = `https://dduhalde.online/.netlify/functions/api/inhabitants/${formData.build}/${formData.apartment}`;
    fetch(url_api)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setInhabitants(data);
      } else {
          setShowNoInhabitantsAlert(true)
          timeAlerts(() => setShowNoInhabitantsAlert(false));
      }
      })
      .catch(error => {
        setShowInhabitantsFaildAlert(true);
        timeAlerts(() => setShowInhabitantsFaildAlert(false));
      });
      
    //Se cambia el form que se visualiza
    setShowSearchForm(false);
    setShowCorrespondenceForm(true);
  };

  
  const handleSubmit = (e) => {
    
    // Si se le envio a una persona o más el mensaje es 1, sino 0
    const notified = selectedInhabitants.length !== 0 ? 1 : 0

    // Array filtrado con los que queremos que les llegue el mensaje
    const filteredArray = inhabitants.filter(obj => selectedInhabitants.includes(obj.id));

    // Realizar la solicitud ADD al servidor a partir de algunos parametros
    fetch(`https://dduhalde.online/.netlify/functions/api/add_mail/${formData.build}/${formData.apartment}/${formData.type}/${formData.timeOfArrival}/${notified}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar la corrrespondencia');
      }
      console.log(`Se agrego la corrrespondencia`);
    })
    .catch(error => {
      console.error('Error al agregar la corrrespondencia:', error);
    });

    const error = WhatsAppMsg(formData, filteredArray)
    if (error) {
      // Alerta de Mensaje No enviado
      setShowMsgFaildAlert(true);
      timeAlerts(() => setShowMsgFaildAlert(false));
    }
    else {
      // Alerta de Mensaje envio
      setShowMsgSuccessAlert(true);
      timeAlerts(() => setShowMsgSuccessAlert(false));
    }

  // Se renician las selecciones
  setFormData({
    type: 'Packages',
    timeOfArrival: '',
    isClaimed: false,
    apartment: '',
    build: '',
  });

  //Se cambia el form que se visualiza
  setShowSearchForm(true);
  setShowCorrespondenceForm(false);
  }

  const handleSelectInhabitant = (inhabitantId) => {
  // Verificar si el habitante ya está seleccionado
  const isSelected = selectedInhabitants.includes(inhabitantId);

  // Si ya está seleccionado, lo eliminamos de la lista de seleccionados
  if (isSelected) {
    setSelectedInhabitants(selectedInhabitants.filter(id => id !== inhabitantId));
    } else { // Si no está seleccionado, lo agregamos a la lista de seleccionados
      setSelectedInhabitants([...selectedInhabitants, inhabitantId]);
    }
  };

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{t('correspondenceForm.addNewCorrespondence')}</h2>
              {showSearchForm && (
              <form onSubmit={handleSearch}>
                <div class="mb-3">
                  <label for="apartment" class="form-label">{t('correspondenceForm.selectApartment')}</label>
                  <input type="text" class="form-control" id="apartment" name="apartment" value={formData.apartment} onChange={handleChange} required placeholder={t('correspondenceForm.selectApartment')}/>
                </div>
                <div class="mb-3">
                  <label for="build" class="form-label">{t('correspondenceForm.selectTower')}</label>
                  <input type="text" class="form-control" id="build" name="build" value={formData.build} onChange={handleChange} required placeholder={t('correspondenceForm.selectTower')}/>
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3">{t('correspondenceForm.searchresident')}</button>
                </div>
              </form>
              )}
              {showCorrespondenceForm && (
              <form onSubmit={handleSubmit}>
                {inhabitants && inhabitants.length > 0 && (
                <div>
                  <h4 class="mt-2">{t('correspondenceForm.selectMsg')}</h4>
                  <div class="mb-3">
                    <ul class="form-check">
                      {inhabitants.map(inhabitant => (
                        <li key={inhabitant.id}>
                          <label class="form-check-label" for="flexCheckDefault">
                            <input class="form-check-input" type="checkbox"checked={selectedInhabitants.includes(inhabitant.id)} onChange={() => handleSelectInhabitant(inhabitant.id)}/>
                            {' '}{inhabitant.first_name} {inhabitant.last_name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}
                <label for="type" class="form-label">{t('correspondenceForm.type')}</label>
                <select class="form-select" aria-label="Default select example" value={selectedOption} onChange={handleOptionChange}>
                  <option value="Packages">{t('correspondenceForm.packages')}</option>
                  <option value="Letters">{t('correspondenceForm.letters')}</option>
                  <option value="Item">{t('correspondenceForm.item')}</option>
                  <option value="Food">{t('correspondenceForm.food')}</option>
                  <option value="Others">{t('correspondenceForm.others')}</option>
                </select>
                <div class="mb-3 mt-3">
                  <label for="timeOfArrival" class="form-label">{t('correspondenceForm.timeOfArrival')}</label>
                  <input type="datetime-local" class="form-control" id="timeOfArrival" name="timeOfArrival" value={formData.timeOfArrival} onChange={handleChange} required/>
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3">{t('correspondenceForm.addCorrespondence')}</button>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showMsgSuccessAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('correspondenceForm.MsgSuccessAlert')}
          </div>
          )}
          {showMsgFaildAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('correspondenceForm.MsgFailAlert')}
          </div>
          )}
          {showInhabitantsFaildAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('correspondenceForm.inhabitantsFailAlert')}
          </div>
          )}
          {showNoInhabitantsAlert && (
          <div className="alert alert-warning text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('correspondenceForm.NoinhabitantsAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCorrespondenceForm;
