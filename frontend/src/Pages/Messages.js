import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Messages = () => {
  const { t } = useTranslation();

  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(t('messages.selectType'));

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSendMessage = () => {
    // Lógica para enviar el mensaje se implementa aquí
    console.log(`Mensaje: ${message}, Tipo: ${selectedOption}`);
  };

  return (
    <div className="messages-container">
      <h1>{t('messages.contactConcierge')}</h1>
      <div className="input-container">
        <textarea
          className="message-input"
          placeholder={t('messages.writeMessage')}
          value={message}
          onChange={handleInputChange}
          rows={4}
          resize="none"
        ></textarea>
      </div>
      <div className="options-container">
        <select className="type-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="" disabled hidden>{t('messages.selectType')}</option>
          <option value="Packages">{t('messages.packages')}</option>
          <option value="Visits">{t('messages.visits')}</option>
          <option value="Cars">{t('messages.cars')}</option>
          <option value="Parking">{t('messages.parking')}</option>
          <option value="Others">{t('messages.others')}</option>
        </select>
      </div>
      <button className="send-button" onClick={handleSendMessage}>{t('messages.sendMessage')}</button>
    </div>
  );
};

export default Messages;
