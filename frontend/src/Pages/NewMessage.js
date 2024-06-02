import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
const NewMessage = () => {
  const { t } = useTranslation();

  // Create message & selected option states
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(t('messages.selectType'));

  // Create the handles for input, selection and sending of messages
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleSendMessage = () => {
    // TODO logic to send message
  };

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
          <div className="col-md-6">
          <h1 class="text-center mb-4">{t('messages.contactConcierge')}</h1> 
      <hr className="mb-4"/>  
          <div class="mb-2">
            <label for="exampleFormControlTextarea1" class="form-label">{t('messages.writeMessage')}</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" rezise="none" value={message}
          onChange={handleInputChange}></textarea>
          </div>
      </div>
      <div class="text-center mt-4">
      <button class="btn btn-primary"  onClick={handleSendMessage}>{t('messages.sendMessage')}</button>
      </div>
    </div>
    </div>
  );
};

export default NewMessage;
