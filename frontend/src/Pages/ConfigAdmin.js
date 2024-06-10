import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parseJwt, passwordHashed } from '../Utils';


{/*
              // input1: ask for current password (password)
              // input2: ask for new password (newPassword)
              // input3: confirm new password (newPassword2)
              // Submit button
              // verify that (newPassword === newPassword2)
              // confirm that current password is correct
              // modify password in the DB, considering hash and salt */}

const ConfigAdmin = () => {
  // General configuration
  const { t } = useTranslation();

  // Variables
  const [activeTab, setActiveTab] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [newParkingTime, setNewParkingTime] = useState('');
  const [newParkingLimitTime, setNewParkingLimitTime] = useState('');
  const [newParkingAmmount, setNewParkingAmmount] = useState('');

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // Reset error message
    setPasswordError('');
    // Validation logic
    if (newPassword !== newPasswordConfirmed) {
        setPasswordError(t('configAdmin.passwordsDoNotMatch'));
        return;
    }
    if (newPassword == currentPassword) {
      setPasswordError(t('configAdmin.passwordsMatch'));
      return;
  }
    if (newPassword.length < 4) {
        setPasswordError(t('configAdmin.passwordTooShort'));
        return;
    }
    else {
        updatePassword(newPassword, currentPassword);
    }
  }

  const handleToggleTab = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  // Get the token from the local storage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const parking_spot_ammount = sessionStorage.getItem('parking_spot_ammount');
  const parking_limit_time = sessionStorage.getItem('parking_limit_time');
  const parking_time_window = sessionStorage.getItem('parking_time_window');
  const storedTowerId = sessionStorage.getItem('tower_id_associated');
  const user_role = sessionStorage.getItem('user_role');
  
  const handleParkingTimeSubmit = (event) => {
    event.preventDefault();
    fetch(`https://dduhalde.online/.netlify/functions/api/updateparkingtime/${storedTowerId}/${newParkingTime}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to update.');
      }
      sessionStorage.setItem('parking_limit_time', newParkingTime);
    })
    .catch(error => {
    });
  }

  const handleParkingLimitTimeSubmit = (event) => {
    event.preventDefault();
    fetch(`https://dduhalde.online/.netlify/functions/api/updatetimenotification/${storedTowerId}/${newParkingLimitTime}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to update.');
      }
      sessionStorage.setItem('parking_time_window', newParkingLimitTime);
    })
    .catch(error => {
    });
  }

  const handleParkingAmmountSubmit = (event) => {
    event.preventDefault();
    fetch(`https://dduhalde.online/.netlify/functions/api/updateparkingammount/${storedTowerId}/${newParkingAmmount}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to update.');
      }
      sessionStorage.setItem('parking_spot_ammount', newParkingAmmount);
    })
    .catch(error => {
    });
  }
  

  // Verify password
  const updatePassword = (newPassword, currentPassword) => {
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
                    const password_hashed_input = passwordHashed(currentPassword, salt);
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
                    }
                  } else {
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
        {user_role == '2' && (
          <div>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('changeParkingTime')}>
          {t('configAdmin.changeParkingTime')}
        </button>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('changeParkingLimitTime')}>
          {t('configAdmin.changeParkingLimitTime')}
        </button>
        <button className="btn btn-primary config-button ms-3" onClick={() => handleToggleTab('changeParkingAmmount')}>
          {t('configAdmin.changeParkingAmmount')}
        </button>
        </div>
        )}
        <div className="mt-3">
          <Collapse in={activeTab === 'changePassword'}>
            <div className="card p-3">
              <h3>{t('configAdmin.changePassword')}</h3>
              <form onSubmit={handlePasswordSubmit}>
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
                        <button type="submit" className="btn btn-primary">{t('configAdmin.submitPasswordButton')}</button>
                    </div>
                </form>
            </div>
            </Collapse>
            {user_role == '2' && (
              <div>
            <Collapse in={activeTab === 'changeParkingTime'}>
            <div className="card p-3">
              <h3>{t('configAdmin.changeParkingTime')}</h3>
              <h4>{parking_limit_time}</h4>
              <form onSubmit={handleParkingTimeSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" value={newParkingTime} placeholder={t('configAdmin.ParkingTimePH')} onChange={(e) => setNewParkingTime(e.target.value)}/>
                </div>
                <div className="d-grid gap-1">
                  <button type="submit" className="btn btn-primary">{t('configAdmin.submitParkingTimeButton')}</button>
                </div>
              </form>
            </div>
          </Collapse>
          <Collapse in={activeTab === 'changeParkingLimitTime'}>
            <div className="card p-3">
              <h3>{t('configAdmin.changeParkingLimitTime')}</h3>
              <h4>{parking_time_window}</h4>
              <form onSubmit={handleParkingLimitTimeSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" value={newParkingLimitTime} placeholder={t('configAdmin.ParkingLimitTimePH')} onChange={(e) => setNewParkingLimitTime(e.target.value)}/>
                </div>
                <div className="d-grid gap-1">
                  <button type="submit" className="btn btn-primary">{t('configAdmin.submitParkingLimitTimeButton')}</button>
                </div>
              </form>
            </div>
          </Collapse>
          <Collapse in={activeTab === 'changeParkingAmmount'}>
            <div className="card p-3">
              <h3>{t('configAdmin.changeParkingAmmount')}</h3>
              <h4>{parking_spot_ammount}</h4>
              <form onSubmit={handleParkingAmmountSubmit}>
                <div className="mb-3">
                  <input type="number" className="form-control" value={newParkingAmmount} placeholder={t('configAdmin.ParkingAmmountPH')} onChange={(e) => setNewParkingAmmount(e.target.value)}/>
                </div>
                <div className="d-grid gap-1">
                  <button type="submit" className="btn btn-primary">{t('configAdmin.submitParkingAmmountButton')}</button>
                </div>
              </form>
            </div>
          </Collapse>
          </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ConfigAdmin;
