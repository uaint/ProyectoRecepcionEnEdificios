import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import React, { useEffect } from 'react';

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

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenExpiration = parseJwt(token).exp * 1000;
      if (tokenExpiration > Date.now()) {
        console.log('Token válido');
      } else {
        console.log('Token expirado');
        localStorage.removeItem('token');
        if (window.location.pathname === '/login'){
        } else {
          window.location.href = '/login';
        }
      }
    } else {
      console.log('No hay token');
      if (window.location.pathname === '/login'){
      } else {
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}> {/* Usa I18nextProvider para traducir el sistema */}
        <BrowserRouter>
        {window.location.pathname !== '/login' && (
        <NavbarConcierge />
        )}
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
