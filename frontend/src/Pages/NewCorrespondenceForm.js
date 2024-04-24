import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Funcion para obtener fecha actual y comparar con otra fecha, para ver cual como será el mensaje
function obtenerFecha(fecha) {

  //Conseguir fecha actual
  const fechaActual = new Date();

  //Formatear fecha entregada
  const fechaDada = new Date(fecha);

  const hora = String(fechaDada.getHours()).padStart(2, '0');
  const minutos = String(fechaDada.getMinutes()).padStart(2, '0');

  if (
    fechaActual.getFullYear() === fechaDada.getFullYear() &&
    fechaActual.getMonth() === fechaDada.getMonth() &&
    fechaActual.getDate() === fechaDada.getDate()
  ) {
    // Si el día es igual se retorna lo siguiente
    return `hoy a las ${hora}:${minutos}`;
  } else {
    // Formatear la fecha en formato "dd/mm/yyyy"
    const dia = String(fechaDada.getDate()).padStart(2, '0');
    const mes = String(fechaDada.getMonth() + 1).padStart(2, '0');
    const año = fechaDada.getFullYear();

    // Si es otro día se retorna lo siguiente
    return `el día ${dia}/${mes}/${año} a las ${hora}:${minutos}`;
  }
}

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

  // Buscan personas con la api, segun edificio y departamento, para ver a que enviar mensajes
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
      
    //Se cambia el form que se visualiza
    setShowSearchForm(false);
    setShowCorrespondenceForm(true);
  };

  // Formatear fecha para el mensaje de WhatsApp
  const fechamsg = obtenerFecha(formData.timeOfArrival);
  
  const handleSubmit = (e) => {
    
    // Si se le envio a una persona o más el mensaje 1, sino 0
    const notified = selectedInhabitants.length !== 0 ? 1 : 0

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

    e.preventDefault();

    // Array filtrado con los que queremos que les llegue el mensaje
    const filteredArray = inhabitants.filter(obj => selectedInhabitants.includes(obj.id));

    // Se importan credenciales de .env
    const token = process.env.REACT_APP_TOKEN;
    const version = process.env.REACT_APP_VERSION;
    const id_number = process.env.REACT_APP_ID_NUMBER;

    // Iterar a los que queremos enviarle el mensaje
    for (let i = 0; i < filteredArray.length; i++) {
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
      // Se genera la consulta
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
    //Se cambia el form que se visualiza
    setShowSearchForm(true);
    setShowCorrespondenceForm(false);

    // Se renician las selecciones
    setFormData({
      type: 'Packages',
      timeOfArrival: '',
      isClaimed: false,
      apartment: '',
      build: '',
    });
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
    </div>
  );
};

export default NewCorrespondenceForm;
