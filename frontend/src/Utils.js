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

export { parseJwt, formatDateLarge, formatDate, timeAlerts };