import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { timeAlerts } from '../Utils.js';

const NewMessage = () => {

  // General configuration
  const { t } = useTranslation();

  // Get the tower_id_associated and person_id from the sessionStorage
  const tower_id_associated = sessionStorage.getItem('tower_id_associated');
  const person_id = sessionStorage.getItem('person_id');

  // Show alerts
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFaildAlert, setShowFaildAlert] = useState(false);

  // Create message & selected option states
  const [message, setMessage] = useState('');

  // Create the handles for input, selection and sending of messages
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Send message to the concierge
  const handleSendMessage = () => {
    fetch(`https://dduhalde.online/.netlify/functions/api/new_msg/${person_id}/${tower_id_associated}/${message}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occured trying to send the message.');
      }
      setShowSuccessAlert(true);
      timeAlerts(() => setShowSuccessAlert(false));
      setMessage('');
    })
    .catch(error => {
      setShowFaildAlert(true)
      timeAlerts(() => setShowFaildAlert(false));
    });
  };

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
          <div className="col-md-6">
          <h1 class="text-center mb-4">{t('newMessage.contactConcierge')}</h1> 
      <hr className="mb-4"/>  
          <div class="mb-2">
            <label for="exampleFormControlTextarea1" class="form-label">{t('newMessage.writeMessage')}</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" rezise="none" value={message}
          onChange={handleInputChange} maxlength="512"></textarea>
          </div>
      </div>
      <div class="text-center mt-4">
      <button class="btn btn-primary"  onClick={handleSendMessage}>{t('newMessage.sendMessage')}</button>
      </div>
    </div>
    <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showSuccessAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('newMessage.SuccessAlert')}
          </div>
          )}
          {showFaildAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('newMessage.FailAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
