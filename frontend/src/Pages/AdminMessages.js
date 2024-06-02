import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDateLarge, timeAlerts } from '../Utils.js';

const AdminMessages = () => {
  const { t } = useTranslation();

  const user_role = sessionStorage.getItem('user_role');
  const tower_id_associated = sessionStorage.getItem('tower_id_associated');

  // Create messages
  const [messages, setMessages] = useState([]);

  // Create alerts
  const [showMsgAlert, setShowMsgAlert] = useState(false);
  const [showDeleteFailAlert, setShowDeleteFailAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Define the API call to the get_msg
  const fetchMessagesData = () => {
    fetch(`https://dduhalde.online/.netlify/functions/api/get_msg/${tower_id_associated}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMessages(data[0]);
      })
      .catch(error => {
        setShowMsgAlert(true);
        timeAlerts(() => setShowMsgAlert(false));
      });
  };

  // Fetch Messages data through the API
  useEffect(() => {
    fetchMessagesData();
  }, []);

  const handleDelete = (id) => {
    fetch(`https://dduhalde.online/.netlify/functions/api/delete_msg/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred when trying to delete Msg.');
      }
      setShowDeleteAlert(true);
      timeAlerts(() => setShowDeleteAlert(false));
      fetchMessagesData();
    })
    .catch(error => {
      setShowDeleteFailAlert(true);
      timeAlerts(() => setShowDeleteFailAlert(false));
    });
  };


  return (
    <div id="change" className="container">
      {user_role !== '3' && (
      <div className="row justify-content-center">
          <div className="col-md-6">
          <h1 className="text-center mb-4">{t('adminMessages.adminCorrespondence')}</h1>
      <hr className="mb-4"/>
      <div>
        {messages.map((message) => (
          <div key={message.message_id} className="card mb-2">
            <div className="card-body">
                <div className="row">
                <div className="col-md-4 text-center">
                  <h4 className="card-title mb-2">{message.sender_full_name}</h4>
                  <p className="card-text mb-0"><strong>{t('adminMessages.labelBuilding')}</strong> {message.tower_number}</p>
                  <p className="card-text mb-0"><strong>{t('adminMessages.labelApartment')}</strong> {message.apartment_number}</p>
                </div>
                <div className="col-md-8">
                  <p className="card-text">{message.message}</p>
                </div>
              <p className="card-date text-end">{formatDateLarge(message.sent_at)}</p>
              </div>
              <div class="d-grid gap-2 m-0 p-0">
                <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(message.message_id)}>{t('adminMessages.delete')}</button>
            </div>
          </div>
        </div>       
        ))}
    </div>
    </div>
    </div>
  )}
  <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showDeleteAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('adminMessages.deleteSuccessAlert')}
          </div>
          )}
          {showDeleteFailAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminMessages.deleteFailAlert')}
          </div>
          )}
          {showMsgAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('adminMessages.messagesAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
