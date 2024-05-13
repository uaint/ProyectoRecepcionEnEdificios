import axios from 'axios';

// Funcion para obtener informacion del JWT
function parseJwt(token) {
    if (token == null) {
        return false;
    } else {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}

// Funcion para formatear la fecha
function formatDateLarge(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    // Se ajusta para que se vea más estetica
    return date.toLocaleDateString('es-ES', options);
  }

// Funcion para formatear la fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric'
    };
    // Se ajusta para que se vea más estetica
    return date.toLocaleDateString('es-ES', options);
  }

function timeAlerts(funcion) {
    setTimeout(() => {
      funcion(false);
    }, 3000);
  }

// Obtener fecha actual y comparar con otra fecha
function whatsAppDate(fecha) {

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

    // Si es otro día, se retorna lo siguiente:
    return `el día ${dia}/${mes}/${año} a las ${hora}:${minutos}`;
  }
}

function WhatsAppMsg(data, inhabitants) {

  // Se importan credenciales de .env
  const token = process.env.REACT_APP_TOKEN;
  const version = process.env.REACT_APP_VERSION;
  const id_number = process.env.REACT_APP_ID_NUMBER;


  const fechamsg = whatsAppDate(data.timeOfArrival);

  let error = false;

  for (let i = 0; i < inhabitants.length; i++) {

    const inhabitant = inhabitants[i];
    const name = inhabitant.first_name;
    const number = inhabitant.contact_number;

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
        error = true
    ))
  }
  return error
}

function EmailMsg(data, inhabitants) {

  const fechamsg = whatsAppDate(data.timeOfArrival);

  for (let i = 0; i < inhabitants.length; i++) {

    const inhabitant = inhabitants[i];
    const name = inhabitant.first_name;
    const last_name = inhabitant.last_name;
    const email = inhabitant.email;

    const data = {
      service_id: "default_service",
      template_id: "template_fphdsb6",
      user_id: "KjPIPF-_UblYm5q8y",
      template_params: {
        emailjs_name: name,
        emailjs_last_name: last_name,
        emailjs_date: fechamsg,
        emailjs_email: email
      }
    };
    const url = "https://api.emailjs.com/api/v1.0/email/send";
    axios.post(url, data);
  }
}

export { parseJwt, formatDateLarge, formatDate, timeAlerts, whatsAppDate, WhatsAppMsg, EmailMsg };