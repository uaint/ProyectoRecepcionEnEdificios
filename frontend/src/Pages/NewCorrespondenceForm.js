import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css'; // Importar estilos CSS específicos para este formulario
import axios from 'axios';

function obtenerFecha(fecha) {
  const fechaActual = new Date();
  const fechaDada = new Date(fecha);

  const hora = String(fechaDada.getHours()).padStart(2, '0');
  const minutos = String(fechaDada.getMinutes()).padStart(2, '0');

  if (fechaActual.getFullYear() === fechaDada.getFullYear() &&
      fechaActual.getMonth() === fechaDada.getMonth() &&
      fechaActual.getDate() === fechaDada.getDate()) {
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
    type: '',
    timeArrival: '',
    isClaimed: false,
    apartment: '',
    inhabitant: '',
  });

  const [selectedOption, setSelectedOption] = useState(t('correspondenceForm.type'));
  const [apartmentOptions, setApartmentOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const [showSearchForm, setShowSearchForm] = useState(true);
  const [showCorrespondenceForm, setShowCorrespondenceForm] = useState(false);

  const fechamsg = obtenerFecha(formData.timeArrival);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.timeArrival);
    console.log(selectedInhabitants); // ids de gente seleccionada para que le llegue el mensaje
    console.log(inhabitants); // todos los que viven en el departamento seleccionado
    const filteredArray = inhabitants.filter(obj => selectedInhabitants.includes(obj.id));
    console.log(filteredArray); // array filtrado con los que queremos que les llegue el mensaje

    //const token = process.env.TOKEN;
    const token = "EAAUvkPP1XacBOwT2opqZCGx90oKCJI8vB13l9KtCNFt3TFk2AbVdjeKJul09roeeGZCLRgjQSOxhHrXAt2YrYsKLKE6SwdUToeYm0jrY3VKQ8GofkwXyB0MkFgRKWa1bY3M9O5E6U3rXyP5f2SgSa3PFPwl5iYvXtVJ8NEcV3n1Sg7FFzfVRXF9YPdmbzrJj1HJB4XgZBah586ZC1HE7";
    //const version = process.env.VERSION;
    const version = "v18.0"
    //const id_number = process.env.ID_NUMBER;
    const id_number = "232684529936100"

    for (let i = 0; i < filteredArray.length; i++) { // Iterar a los que queremos enviarle el mensaje
      const obj = filteredArray[i];
      const name = obj.first_name;
      const number = obj.contact_number;

      // Se envia WhatsApp por la correspondencia
      const message = `*Atención ${name}* \nHay un paquete esperando por ti en conserjería, llego ${fechamsg}, por favor ven a recogerlo a la brevedad.`;

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
    console.log(formData.build);
    console.log(formData.apartment);
    const url_api = `http://localhost:3001/inhabitants/${formData.build}/${formData.apartment}`;
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
    <div className="formContainer">
      <h2>{t('correspondenceForm.addNewCorrespondence')}</h2>
      {showSearchForm && (
        <div>
        <div className="formGroup">
            <label htmlFor="apartment">{t('correspondenceForm.selectApartment')}</label>
            <input
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleApartmentChange}
              required
              className="inputField"
              placeholder={t('correspondenceForm.selectApartment')}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="build">{t('correspondenceForm.selectInhabitant')}</label>
            <input
              id="build"
              name="build"
              value={formData.build}
              onChange={handleBuildChange}
              required
              className="inputField"
              placeholder={t('correspondenceForm.selectInhabitant')}
            />
            </div>
      <button type="submit" className="submitButton mb-4" onClick={handleSearch}>Buscar Habitantes</button>
      </div>
      )}
      {showCorrespondenceForm && (
      <div>
      <h4>Selecciona para enviar mensaje:</h4>
      <ul className="list-group">
        {inhabitants.map(inhabitant => (
          <li key={inhabitant.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedInhabitants.includes(inhabitant.id)}
                onChange={() => handleSelectInhabitant(inhabitant.id)}
              />
              {' '}{inhabitant.first_name} {inhabitant.last_name}
            </label>
          </li>
        ))}
      </ul>
      <div className="formGroup">
          <div className="options-container">
            <select className="form-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="" disabled hidden>{t('correspondenceForm.type')}</option>
              <option value="Packages">{t('correspondenceForm.packages')}</option>
              <option value="Letters">{t('correspondenceForm.letters')}</option>
              <option value="Item">{t('correspondenceForm.item')}</option>
              <option value="Others">{t('correspondenceForm.others')}</option>
            </select>
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="timeArrival">{t('correspondenceForm.timeOfArrival')}</label>
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
        <button type="submit" className="submitButton" onClick={handleSubmit}>{t('correspondenceForm.addCorrespondence')}</button>
        </div>
   )}
  </div>
  );
};

export default NewCorrespondenceForm;
