import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './App.css';



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
import Notifications from './Pages/notifications';
import SearchPersonByRut from './Pages/SearchPersonByRut';
import ScanID from './Pages/ScanID';
import AdminVisits from './Pages/AdminVisits';
import Messages from './Pages/Messages';
import Config from './Pages/config';
import AdminCorrespondence from './Pages/AdminCorrespondence';
import AdminMessages from './Pages/AdminMessages';
import ConfigAdmin from './Pages/ConfigAdmin';
import NewVehicleForm from './Pages/NewVehicleForm';
import AdminParking from './Pages/AdminParking';

//Importar funcion de verificacion token
import { parseJwt } from './Utils';




function App() {

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtiene la data del token desde localStorage
    if (token) {
      // Parsea el token y verifica su caducacion (si esta expirado o vencido)
      const tokenExpiration = parseJwt(token).exp * 1000;
      if (tokenExpiration > Date.now()) {
        console.log('Token válido');
      } else {
        // Si token expira, redirigimos a la página de login, removemos el token del ambiente local y quitamos navbar
        console.log('Token expirado');
        localStorage.removeItem('token'); // removemos data del token del ambiente local
        if (window.location.pathname !== '/login'){
          window.location.href = '/login';
        }
      }
    } else {
      // Al no estar loggeado o caducar token, redirige a la página de login
      console.log('No hay token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
  }
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
              <Route path="/searchpersonbyrut" element={<SearchPersonByRut />} />
              <Route path="/scanid" element={<ScanID />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/newvehicleform" element={<NewVehicleForm />} />
              <Route path="/config" element={<Config />} />
              <Route path="/configadmin" element={<ConfigAdmin />} />
              <Route path="/admincorrespondence" element={<AdminCorrespondence />} />
              <Route path="/adminmessages" element={<AdminMessages />} />
              <Route path="/adminvisits" element={<AdminVisits />} />
              <Route path="/adminparking" element={<AdminParking />} />
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
