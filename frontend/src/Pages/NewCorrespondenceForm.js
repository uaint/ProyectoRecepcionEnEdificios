import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({
    type: '',
    timeArrival: '',
    isClaimed: false,
    apartment: '',
    inhabitant: '',
  });

  const [selectedOption, setSelectedOption] = useState('Type');
  const [apartmentOptions, setApartmentOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const fechamsg = obtenerFecha(formData.timeArrival);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario a la base de datos
    // Conseguir el o los numeros a quienes enviar el mensaje conectando con BBDD
    const number_to_text = "+56975672372";
    // Variables del .env
    const token = process.env.TOKEN;
    const version = process.env.VERSION;
    const id_number = process.env.ID_NUMBER;
    console.log(token)
    // Se envia WhatsApp por la correspondencia

    const message = `*Atención* \nHay un paquete esperando por ti en conserjería, llego ${fechamsg}, por favor ven a recogerlo a la brevedad.`;

    const data_msg = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number_to_text,
        "type": "text",
        "text": {"preview_url": false, "body": message},
    }

    const header = {
        headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
        }
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
    const url = `https://graph.facebook.com/${version}/${id_number}/messages`
    console.log(url)
    axios.post(url, data_msg, header)
    .then((res)=>(
        console.log("Msg send success", res)
    ))
    .catch((res)=>(
        console.log("Error sending msg", res)
    ))
    console.log('Form submitted:', formData);
    // Resetear el formulario después de enviar los datos
    setFormData({
      type: '',
      timeArrival: '',
      isClaimed: false,
      apartment: '',
      inhabitant: '',
    });
  };

  // Simulación de datos de apartamentos y habitantes
  const apartmentData = [
    { id: 1, name: '101', inhabitants: ['Juan Pérez', 'María González'] },
    { id: 2, name: '202', inhabitants: ['Pedro López', 'Ana Martínez'] },
    { id: 3, name: '303', inhabitants: ['Sofía Rodríguez', 'Carlos Ruiz'] },
  ];

  // Función para manejar el cambio en la selección del apartamento
  const handleApartmentChange = (e) => {
    const selectedApartment = e.target.value;
    const selectedApartmentData = apartmentData.find((apartment) => apartment.name === selectedApartment);
    setApartmentOptions(selectedApartmentData.inhabitants);
    setFormData({ ...formData, apartment: selectedApartment });
  };

  // Función para manejar el cambio en la selección del habitante
  const handleInhabitantChange = (e) => {
    const selectedInhabitant = e.target.value;
    setFormData({ ...formData, inhabitant: selectedInhabitant });
  };

  return (
    <div className="formContainer">
      <h2>Add New Correspondence</h2>
      <form onSubmit={handleSubmit} className="correspondenceForm">
        <div className="formGroup">
          <div className="options-container">
            <select className="type-select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="Type" disabled hidden>Type</option>
              <option value="Packages">Packages</option>
              <option value="Letters">Letters</option>
              <option value="Item">Item</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="formGroup">
          <label htmlFor="timeArrival">Time of Arrival:</label>
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
        <div className="formGroup">
          <label htmlFor="apartment">Apartment:</label>
          <select
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleApartmentChange}
            required
            className="inputField"
          >
            <option value="" disabled hidden>Select Apartment</option>
            {apartmentData.map((apartment) => (
              <option key={apartment.id} value={apartment.name}>
                {apartment.name}
              </option>
            ))}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="inhabitant">Inhabitant:</label>
          <select
            id="inhabitant"
            name="inhabitant"
            value={formData.inhabitant}
            onChange={handleInhabitantChange}
            required
            className="inputField"
          >
            <option value="" disabled hidden>Select Inhabitant</option>
            {apartmentOptions.map((inhabitant, index) => (
              <option key={index} value={inhabitant}>
                {inhabitant}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submitButton">Add Correspondence</button>
      </form>
    </div>
  );
};

export default NewCorrespondenceForm;
