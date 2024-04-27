import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';


// Importa los componentes
import NavbarConcierge from './components/NavbarConcierge';
import NavbarResident from './components/NavbarResident';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importa las páginas
import Home from './Pages/Home';
import Login from './Pages/Login';
import NewCorrespondenceForm from './Pages/NewCorrespondenceForm';
import NewVisitForm from './Pages/NewVisitForm';
import Notifications from './Pages/notifications';
import SearchPersonByRut from './Pages/SearchPersonByRut';
import ScanID from './Pages/ScanID';
import AdminFrequentVisits from './Pages/AdminFrequentVisits';
import Messages from './Pages/Messages';
import Config from './Pages/config';
import AdminCorrespondence from './Pages/AdminCorrespondence';
import AdminMessages from './Pages/AdminMessages';
import ConfigAdmin from './Pages/ConfigAdmin';
import NewVehicleForm from './Pages/NewVehicleForm';
import AdminParking from './Pages/AdminParking';

//Importar funcion de verificacion token
import { parseJwt } from './Utils';


// Estado inicial de la autenticación del usuario
const initialState = {
  isAuthenticated: false,
  isLoading: true,
};



function App() {
  const [authState, setAuthState] = useState(initialState); // Variable para verificar si el usuario está autenticado

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtiene la data del token desde localStorage
    if (token) {
      // Parsea el token y verifica su caducacion (si esta expirado o vencido)
      const tokenExpiration = parseJwt(token).exp * 1000;
      if (tokenExpiration > Date.now()) {
        console.log('Token válido');
        setAuthState({ isAuthenticated: true, isLoading: false }); // Cambia el estado de autenticación a true
        // le muestra la navbarConcierge al comprobar validez del token
      } else {
        // Si token expira, redirigimos a la página de login, removemos el token del ambiente local y quitamos navbar
        console.log('Token expirado');
        localStorage.removeItem('token'); // removemos token del ambiente local
        setAuthState({ isAuthenticated: false, isLoading: false }); // Cambia el estado de autenticación a false
        if (window.location.pathname !== '/login'){
          window.location.href = '/login';
        }
      }
    } else {
      // Al no estar loggeado o caducar token, redirige a la página de login
      console.log('No hay token');
      setAuthState({ isAuthenticated: false, isLoading: false });
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
  }
  }, []);

  const { isAuthenticated, isLoading } = authState;

  if (isLoading) { // Si está cargando, muestra un mensaje de carga
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}> {/* Usa I18nextProvider para traducir el sistema */}
        <BrowserRouter>
          {isAuthenticated && <NavbarConcierge />} {/*} Si está autenticado, muestra la NavbarConcierge */}
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/newcorrespondenceform" element={<NewCorrespondenceForm />} />
              <Route path="/newvisitform" element={<NewVisitForm />} />
              <Route path="/searchpersonbyrut" element={<SearchPersonByRut />} />
              <Route path="/scanid" element={<ScanID />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/newvehicleform" element={<NewVehicleForm />} />
              <Route path="/config" element={<Config />} />
              <Route path="/configadmin" element={<ConfigAdmin />} />
              <Route path="/admincorrespondence" element={<AdminCorrespondence />} />
              <Route path="/adminmessages" element={<AdminMessages />} />
              <Route path="/adminfrequentvisits" element={<AdminFrequentVisits />} />
              <Route path="/adminparking" element={<AdminParking />} />
              <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redireccionar desde cualquier ruta inválida a /home */}
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </div>
  );
}

export default App;
