import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './App.css';
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next';

// Importa los componentes
import NavbarVisible from './components/NavbarVisible'; // Considera NavbarConcierge
import NavbarNotVisible from './components/NavbarNotVisible'; // Considera Outlet

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importa las páginas
import Home from './Pages/Home';
import Login from './Pages/Login';
import NewCorrespondenceForm from './Pages/NewCorrespondenceForm';
import NewVisitForm from './Pages/NewVisitForm';
import ScanID from './Pages/ScanID';
import AdminVisits from './Pages/AdminVisits';
import NewMessage from './Pages/NewMessage';
import AdminCorrespondence from './Pages/AdminCorrespondence';
import AllCorrespondence from './Pages/AllCorrespondence';
import AdminMessages from './Pages/AdminMessages';
import ConfigAdmin from './Pages/ConfigAdmin';
import NewVehicleForm from './Pages/NewVehicleForm';
import AdminParking from './Pages/AdminParking';
import AdminVehicles from './Pages/AdminVehicles';
import NewFrequentVisitForm from './Pages/NewFrequentVisitForm';

//Importar funcion de verificacion token
import { parseJwt, updateTheme } from './Utils';

function App() {

  if (!localStorage.getItem('i18nextLng')) {
    i18n.changeLanguage('es');
  }

  // General configuration
  const { t } = useTranslation();
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtiene la data del token desde localStorage
    if (token) {
      // Parsea el token y verifica su caducacion (si esta expirado o vencido)
      const tokenExpiration = parseJwt(token).exp * 1000;
      if (tokenExpiration > Date.now()) {
      } else {
        // Si token expira, removemos todo de el storage y si no nos encontramos en /login, nos redirigmios
        localStorage.clear();
        sessionStorage.clear();
        if (window.location.pathname !== '/login'){
          window.location.href = '/login';
        }
      }
    } else {
      // Al no existir token, redirigimos a /login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
  }
  }, []);

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }
  
  // Actualizar el tema cuando se carga la página
  updateTheme();
  
  // Escuchar cambios en el localStorage
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      // Si el cambio es en el key 'theme', actualizar el tema
      updateTheme();
    }
  });

  const getNotificationsFromSessionStorage = () => {
    const data = sessionStorage.getItem('notifications');
    return data ? JSON.parse(data) : [];
  };
  
  const checkNotificationTime = () => {
    const notifications = getNotificationsFromSessionStorage();
    const now = new Date();

    notifications.forEach(notification => {
      const notificationTime = new Date(notification.notificationTime);
    if (now >= notificationTime && now < new Date(notificationTime.getTime() + 30000)) {
      const text_alert = `${t('adminParking.bodyNotification')} \n${t('adminParking.licensePlate')}: ${notification.license_plate} \n${t('adminParking.parkedNumber')}${notification.parking_id}`;
      Swal.fire({title: t('adminParking.titleNotification'), text: text_alert, background: localStorage.getItem('background_color'), color: localStorage.getItem('text_color')});
    } else if (now < notificationTime) {
      // Aun falta
    }
  });
};
  
  useEffect(() => {
    const intervalId = setInterval(checkNotificationTime, 30000); // Verifica 30 segundos
    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}> {/* Usa I18nextProvider para traducir el sistema */}
        <BrowserRouter>
        <Routes>
            <Route element={<NavbarVisible />}>
              <Route path="/home" element={<Home />} />
              <Route path="/newcorrespondenceform" element={<NewCorrespondenceForm />} />
              <Route path="/newvisitform" element={<NewVisitForm />} />
              <Route path="/scanid" element={<ScanID />} />
              <Route path="/newmessage" element={<NewMessage />} />
              <Route path="/newvehicleform" element={<NewVehicleForm />} />
              <Route path="/configadmin" element={<ConfigAdmin />} />
              <Route path="/admincorrespondence" element={<AdminCorrespondence />} />
              <Route path="/allcorrespondence" element={<AllCorrespondence />} />
              <Route path="/adminmessages" element={<AdminMessages />} />
              <Route path="/adminvisits" element={<AdminVisits />} />
              <Route path="/adminparking" element={<AdminParking />} />
              <Route path="/adminvehicles" element={<AdminVehicles />} />
              <Route path="/newfrequentvisitform" element={<NewFrequentVisitForm />} />
              <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redireccionar desde cualquier ruta inválida a /home */}
            </Route>
            <Route element={<NavbarNotVisible />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </div>
  );
}

export default App;
