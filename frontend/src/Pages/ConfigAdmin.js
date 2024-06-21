import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parseJwt, passwordHashed } from '../Utils';

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
    if (newPassword === currentPassword) {
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

  const parking_spot_ammount = localStorage.getItem('parking_spot_ammount');
  const parking_limit_time = localStorage.getItem('parking_limit_time');
  const parking_time_window = localStorage.getItem('parking_time_window');
  const storedTowerId = localStorage.getItem('tower_id_associated');
  const user_role = localStorage.getItem('user_role');
  
  const handleParkingTimeSubmit = (event) => {
    event.preventDefault();
    fetch(`https://dduhalde.online/.netlify/functions/api/updateparkingtime/${storedTowerId}/${newParkingTime}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to update.');
      }
      localStorage.setItem('parking_limit_time', newParkingTime);
      setNewParkingTime('');
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
      localStorage.setItem('parking_time_window', newParkingLimitTime);
      setNewParkingLimitTime('');
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
      localStorage.setItem('parking_spot_ammount', newParkingAmmount);
      setNewParkingAmmount('');
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
    <div id="change" className="container">
      <div className="row justify-content-center">
          <div className="col-md-6">
          <h1 className="text-center mb-4">{t('configAdmin.configuration')}</h1>
      <hr className="mb-5"/>
      <div class="btn-group btn-group-sm d-flex pt-2" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={() => handleToggleTab('changePassword')}></input>
        <label class="btn btn-outline-primary" for="btnradio1">{t('configAdmin.changePassword')}</label>
        {user_role === '2' && (
          <>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={() => handleToggleTab('changeParkingTime')}></input>
        <label class="btn btn-outline-primary" for="btnradio2">{t('configAdmin.changeParkingTime')}</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onClick={() => handleToggleTab('changeParkingLimitTime')}></input>
        <label class="btn btn-outline-primary" for="btnradio3">{t('configAdmin.changeParkingLimitTime')}</label>

        <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" onClick={() => handleToggleTab('changeParkingAmmount')}></input>
        <label class="btn btn-outline-primary" for="btnradio4">{t('configAdmin.changeParkingAmmount')}</label>
        </>
        )}
      </div>
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
            {user_role === '2' && (
              <>
            <Collapse in={activeTab === 'changeParkingTime'}>
            <div className="card p-3">
              <h3>{t('configAdmin.changeParkingTime')}</h3>
              <h4>{t('configAdmin.actualParkingTime')}: {parking_limit_time}</h4>
              <form onSubmit={handleParkingTimeSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" value={newParkingTime} placeholder={t('configAdmin.parkingTimePH')} onChange={(e) => setNewParkingTime(e.target.value)}/>
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
              <h4>{t('configAdmin.actualParkingNotification')}: {parking_time_window}</h4>
              <form onSubmit={handleParkingLimitTimeSubmit}>
                <div className="mb-3">
                  <input type="text" className="form-control" value={newParkingLimitTime} placeholder={t('configAdmin.parkingLimitTimePH')} onChange={(e) => setNewParkingLimitTime(e.target.value)}/>
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
              <h4>{t('configAdmin.actualParkingAmmount')}: {parking_spot_ammount}</h4>
              <form onSubmit={handleParkingAmmountSubmit}>
                <div className="mb-3">
                  <input type="number" className="form-control" value={newParkingAmmount} placeholder={t('configAdmin.parkingAmmountPH')} onChange={(e) => setNewParkingAmmount(e.target.value)}/>
                </div>
                <div className="d-grid gap-1">
                  <button type="submit" className="btn btn-primary">{t('configAdmin.submitParkingAmmountButton')}</button>
                </div>
              </form>
            </div>
          </Collapse>
          </>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfigAdmin;
