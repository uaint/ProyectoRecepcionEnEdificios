import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parseJwt, passwordHashed } from '../Utils';


{/*
              // input1: pedir contraseña actual (password)
              // input2: pedir contraseña nueva (newPassword)
              // input3: confirmar contraseña nueva (newPassword2)
              // boton de submit
              // verificar que input de contraseña nueva y confirmar contraseña nueva sean iguales (newPassword === newPassword2)
              // confirmar que contraseña actual (password) sea correcta
              // modificar contraseña en la base de datos, considerando hash y salt (contraseña no se guarda en texto plano) */}

const ConfigAdmin = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset error message
    setPasswordError('');

    // Validation logic
    if (newPassword !== newPasswordConfirmed) {
        setPasswordError(t('configAdmin.passwordsDoNotMatch'));
        return;
    }

    if (newPassword !== currentPassword) {
      setPasswordError(t('configAdmin.passwordsMatch'));
      return;
  }

    if (newPassword.length < 4) {
        setPasswordError(t('configAdmin.passwordTooShort'));
        return;
    }
    
    else {
        updatePassword(newPassword);
    }}

  const handleToggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };


  // Get the token from the local storage
  const getToken = () => {
    return localStorage.getItem('token');
  };
  

  // Verify password
  const updatePassword = (password) => {
    const token = getToken();
    const decodedToken = parseJwt(token);
    const url_api = `https://dduhalde.online/.netlify/functions/api/login/${decodedToken.username}`;
      fetch(url_api)
      .then(response => response.json())
            .then(data => {
                // There's data retrieved (non-null)
                if (data[0] != null) {
                    const salt = data[0].password_salt;
                    const password_hashed = data[0].password_hashed;
                    const password_hashed_input = passwordHashed(password, salt);
                    if (password_hashed === password_hashed_input) {
                        const newPasswordHashed = passwordHashed(newPassword, salt);
                        // Update the password in the database (api.js)
                        fetch(`https://dduhalde.online/.netlify/functions/api/updatepassword/${data[0].username}/${newPasswordHashed}`)
                        .then(response => response.json())
                        .then(data => {
                            alert('Password updated');
                        })
                        .catch(error => {
                            console.error('Error updating password:', error);
                        })
                    } else {
                        console.log('Incorrect password');
                    }
                  } else {
                    console.log('Token error');
                  }
  });
}


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>{t('configAdmin.configuration')}</h1>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('changePassword')}>
          {t('configAdmin.changePassword')}
        </button>
        <div className="mt-3">
          <Collapse in={activeTab === 'changePassword'}>
            <div className="card p-3">
              <h3>{t('configAdmin.changePassword')}</h3>
              <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="currentPassword" value={currentPassword} placeholder={t('configAdmin.currentPassword')} onChange={(e) => setCurrentPassword(e.target.value)}/>
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="newPassword" value={newPassword} placeholder={t('configAdmin.newPassword')} onChange={(e) => setNewPassword(e.target.value)}/>
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="newPasswordConfirmed" value={newPasswordConfirmed} placeholder={t('configAdmin.newPasswordConfirmed')} onChange={(e) => setNewPasswordConfirmed(e.target.value)}/>
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="d-grid gap-1">
                        <button type="submit" className="btn btn-primary">{t('configAdmin.submitButton')}</button>
                    </div>
                </form>
            </div>
            </Collapse>
        </div>
      </div>
    </div>
  );
};

export default ConfigAdmin;
