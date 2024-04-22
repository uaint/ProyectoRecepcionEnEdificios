import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    type: 'Packages',
    timeArrival: '',
    isClaimed: false,
    apartment: '',
    build: '',
  });

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Actualiza el estado de la opción seleccionada
    setFormData({ ...formData, type: selectedValue }); // Actualiza el formData con el nuevo valor seleccionado
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const [showSearchForm, setShowSearchForm] = useState(true);
  const [showCorrespondenceForm, setShowCorrespondenceForm] = useState(false);

  const fechamsg = obtenerFecha(formData.timeArrival);
  
  const handleSubmit = (e) => {
    
    // Si se le envio a una persona o más el mensaje 1, sino 0
    const notified = selectedInhabitants.length !== 0 ? 1 : 0

    // Realizar la solicitud ADD al servidor
    fetch(`https://dduhalde.online/.netlify/functions/api/add_mail/${formData.build}/${formData.apartment}/${formData.type}/${formData.timeArrival}/${notified}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar la corrrespondencia');
      }
      console.log(`Se agrego la corrrespondencia`);
    })
    .catch(error => {
      console.error('Error al agregar la corrrespondencia:', error);
    });

    e.preventDefault();

    // array filtrado con los que queremos que les llegue el mensaje
    const filteredArray = inhabitants.filter(obj => selectedInhabitants.includes(obj.id));

    // Se importan credenciales de .env
    const token = process.env.REACT_APP_TOKEN;
    const version = process.env.REACT_APP_VERSION;
    const id_number = process.env.REACT_APP_ID_NUMBER;

    for (let i = 0; i < filteredArray.length; i++) { // Iterar a los que queremos enviarle el mensaje
      const obj = filteredArray[i];
      const name = obj.first_name;
      const number = obj.contact_number;

      // Se envia WhatsApp por la correspondencia
      const message = `*Atención ${name}* \nHay un paquete esperando por ti en conserjería, llego *${fechamsg}*, por favor ven a recogerlo a la brevedad.`;

      const data_msg = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": `+${number}`,
        "type": "text",
        "text": {"preview_url": false, "body": message},
      }
      const header = {
      headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
      }
      }
      const url = `https://graph.facebook.com/${version}/${id_number}/messages`
      axios.post(url, data_msg, header)
      .then((res)=>(
          console.log("Msg send success", res)
      ))
      .catch((res)=>(
          console.log("Error sending msg", res)
      ))
      console.log('Form submitted:', formData);
    }
    setShowSearchForm(true);
    setShowCorrespondenceForm(false);
  }

    /*const body = {
              "messaging_product": "whatsapp",
              "to": "+56975672372",
              "type": "template",
              "template": {
                  "name": "saludo",
                  "language": {
                  "code": "es"
                },
        }
    }*/

  // Función para manejar el cambio en la selección del apartamento
  const handleApartmentChange = (e) => {
    const selectedApartment = e.target.value;

    setFormData({ ...formData, apartment: selectedApartment });
  };

  // Función para manejar el cambio en la selección del habitante
  const handleBuildChange = (e) => {
    const selectedBuild = e.target.value;

    setFormData({ ...formData, build: selectedBuild });
  };

  // Buscan personas con la api
  const [selectedInhabitants, setSelectedInhabitants] = useState([]);
  const [inhabitants, setInhabitants] = useState([]);

  const handleSearch = () => {
    const url_api = `https://dduhalde.online/.netlify/functions/api/inhabitants/${formData.build}/${formData.apartment}`;
    fetch(url_api)
      .then(response => response.json())
      .then(data => {
        setInhabitants(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    setShowSearchForm(false);
    setShowCorrespondenceForm(true);
  };

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
                  <input type="text" class="form-control" id="build" name="build" value={formData.build} onChange={handleBuildChange} required placeholder={t('correspondenceForm.selectTower')}/>
                </div>
                <div class="d-grid gap-1">
                  <button type="submit" class="btn btn-primary mt-3">{t('correspondenceForm.searchresident')}</button>
                </div>
              </form>
              )}
              {showCorrespondenceForm && (
              <form onSubmit={handleSubmit}>
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
                <label for="type" class="form-label">{t('correspondenceForm.type')}</label>
                <select class="form-select" aria-label="Default select example" value={selectedOption} onChange={handleOptionChange}>
                  <option value="Packages" selected>{t('correspondenceForm.packages')}</option>
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
    </div>
  );
};

export default NewCorrespondenceForm;
