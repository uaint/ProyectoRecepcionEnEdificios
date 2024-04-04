import React, { useState } from 'react';
import '../App.css';

const Messages = () => {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('Tipo');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSendMessage = () => {
    // Lógica para enviar el mensaje se implementa aqui
    console.log(`Mensaje: ${message}, Tipo: ${selectedOption}`);
  };

  return (
    <div className="messages-container">
      <h1>Contact concierge</h1>
      <div className="input-container">
        <textarea
          className="message-input"
          placeholder="Write your message here..."
          value={message}
          onChange={handleInputChange}
          rows={4} 
          resize="none" 
        ></textarea>
      </div>
      <div className="options-container">
        <select className="type-select" value={selectedOption} onChange={handleSelectChange}>
          <option value="Type" disabled hidden>Type</option>
          <option value="Packages">Packages</option>
          <option value="Visits">Visits</option>
          <option value="Cars">Cars</option>
          <option value="Parking">Parking</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <button className="send-button" onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default Messages;
