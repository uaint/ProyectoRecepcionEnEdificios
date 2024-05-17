import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WhatsAppMsg, timeAlerts, EmailMsg } from '../Utils.js';

const NewCorrespondenceForm = () => {

  // General configurations
  const { t } = useTranslation();

  // Initiate formData with some 'default' values
  const [formData, setFormData] = useState({
    type: 'Packages',
    timeOfArrival: '',
    isClaimed: false,
    apartment: '',
    build: '',
  });

  // Update type according to selected option
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Updates status of the selected option
    setFormData({ ...formData, type: selectedValue }); // Updates formData with the new selected value
  };

  // Function to handle changes in the options of formData
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  // Indicate which part/section of the form to show first or second
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [showCorrespondenceForm, setShowCorrespondenceForm] = useState(false);

  // Search people with the API according to building and apartment, to check to whom send messages
  const [selectedInhabitantsWhatsApp, setSelectedInhabitantsWhatsApp] = useState([]);
  const [selectedInhabitantsEmail, setSelectedInhabitantsEmail] = useState([]);
  const [inhabitants, setInhabitants] = useState([]);

  // Show alerts
  const [showMsgSuccessAlert, setShowMsgSuccessAlert] = useState(false);
  const [showMsgFaildAlert, setShowMsgFaildAlert] = useState(false);
  const [showInhabitantsFaildAlert, setShowInhabitantsFaildAlert] = useState(false);
  const [showNoInhabitantsAlert, setShowNoInhabitantsAlert] = useState(false);

  // Do the call to the API
  const handleSearch = () => {
    const url_api = `https://dduhalde.online/.netlify/functions/api/inhabitants/${formData.build}/${formData.apartment}`;
    fetch(url_api)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setInhabitants(data);
      } else {
          setShowNoInhabitantsAlert(true)
          timeAlerts(() => setShowNoInhabitantsAlert(false));
      }
      })
      .catch(error => {
        setShowInhabitantsFaildAlert(true);
        timeAlerts(() => setShowInhabitantsFaildAlert(false));
      });
      
    // Change form that's being viewed
    setShowSearchForm(false);
    setShowCorrespondenceForm(true);
  };
  
  // Submit the new correspondence
  const handleSubmit = (e) => {
    
    // If sent to one or more people = 1, otherwise = 0
    const notifiedWhatsApp = selectedInhabitantsWhatsApp.length !== 0 ? 1 : 0

    // Filtered array with whatever we want them to receive on the message
    const filteredArrayWhatsApp = inhabitants.filter(obj => selectedInhabitantsWhatsApp.includes(obj.id));

    // Filtered array with whatever we want them to receive on the message
    const filteredArrayEmail = inhabitants.filter(obj => selectedInhabitantsEmail.includes(obj.id));

    // Do the ADD request to the server according to the parameters
    fetch(`https://dduhalde.online/.netlify/functions/api/add_mail/${formData.build}/${formData.apartment}/${formData.type}/${formData.timeOfArrival}/${notifiedWhatsApp}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred trying to add correspondence.');
      }
      console.log(`Correspondence added successfully.`);
    })
    .catch(error => {
      console.error('An error occurred trying to add correspondence:', error);
    });

    const error = WhatsAppMsg(formData, filteredArrayWhatsApp);
    EmailMsg(formData, filteredArrayEmail);

    if (error) {
      // Alert: Message failed to be sent
      setShowMsgFaildAlert(true);
      timeAlerts(() => setShowMsgFaildAlert(false));
    }
    else {
      // Alert: Message sent successfully
      setShowMsgSuccessAlert(true);
      timeAlerts(() => setShowMsgSuccessAlert(false));
    }

  // Reset formData
  setFormData({
    type: 'Packages',
    timeOfArrival: '',
    isClaimed: false,
    apartment: '',
    build: '',
  });

  // Change form being viewed
  setShowSearchForm(true);
  setShowCorrespondenceForm(false);
  }

  const redirectUser = () => {
    // Verificar si todos los campos requeridos están completos
    const { apartment, build, type, timeOfArrival } = formData;
    if (apartment && build && type && timeOfArrival) {
      // Esperar 3000 ms (3 segundos) antes de redirigir al usuario
      setTimeout(() => {
        window.location.href = '/admincorrespondence';
      }, 3000);
    } else {
      alert('Por favor, complete todos los campos requeridos antes de agregar la correspondencia.');
    }
  };
  
  

  const handleSelectInhabitantWhatsApp = (inhabitantId) => {
  // Verify if the inhabitant has been selected
  const isSelected = selectedInhabitantsWhatsApp.includes(inhabitantId);

  // If selected, delete it from the selected list
  if (isSelected) {
    setSelectedInhabitantsWhatsApp(selectedInhabitantsWhatsApp.filter(id => id !== inhabitantId));
    } else { // Else, add it to the list
      setSelectedInhabitantsWhatsApp([...selectedInhabitantsWhatsApp, inhabitantId]);
    }
  };

  const handleSelectInhabitantEmail = (inhabitantId) => {
    // Verify if the inhabitant has been selected
    const isSelected = selectedInhabitantsEmail.includes(inhabitantId);
  
    // If selected, delete it from the selected list
    if (isSelected) {
      setSelectedInhabitantsEmail(selectedInhabitantsEmail.filter(id => id !== inhabitantId));
      } else { // Else, add it to the list
        setSelectedInhabitantsEmail([...selectedInhabitantsEmail, inhabitantId]);
      }
    };

  return (
    <div id="change" className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{t('correspondenceForm.addNewCorrespondence')}</h2>
              {showSearchForm && (
              <form onSubmit={handleSearch}>
                <div className="mb-3">
                  <label htmlFor="apartment" className="form-label">{t('correspondenceForm.selectApartment')}</label>
                  <input type="number" className="form-control" id="apartment" name="apartment" value={formData.apartment} onChange={handleChange} required placeholder={t('correspondenceForm.selectApartment')}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="build" className="form-label">{t('correspondenceForm.selectTower')}</label>
                  <input type="number" className="form-control" id="build" name="build" value={formData.build} onChange={handleChange} required placeholder={t('correspondenceForm.selectTower')}/>
                </div>
                <div className="d-grid gap-1">
                  <button type="submit" className="btn btn-primary mt-3">{t('correspondenceForm.searchresident')}</button>
                </div>
              </form>
              )}
              {showCorrespondenceForm && (
              <form onSubmit={handleSubmit}>
                {inhabitants && inhabitants.length > 0 && (
                <div>
                  <h4 className="mt-2">{t('correspondenceForm.selectMsg')}</h4>
                  <div className="mb-3">
                    <ul className="form-check">
                      {inhabitants.map(inhabitant => (
                        <li key={inhabitant.id}>
                          <div class="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                            <input className="form-check-input" type="checkbox" id={`flexCheckDefault-${inhabitant.id}`} checked={selectedInhabitantsWhatsApp.includes(inhabitant.id)} onChange={() => handleSelectInhabitantWhatsApp(inhabitant.id)}/>
                          </div>
                          <div class="form-check form-check-inline">
                            <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                            <input className="form-check-input" type="checkbox" id={`flexCheckDefault-2-${inhabitant.id}`} checked={selectedInhabitantsEmail.includes(inhabitant.id)} onChange={() => handleSelectInhabitantEmail(inhabitant.id)}/>
                          </div>
                          <div class="form-check form-check-inline">{inhabitant.first_name} {inhabitant.last_name}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                )}
                <label htmlFor="type" className="form-label">{t('correspondenceForm.type')}</label>
                <select className="form-select" aria-label="Default select example" value={selectedOption} onChange={handleOptionChange}>
                  <option value="Packages">{t('correspondenceForm.packages')}</option>
                  <option value="Letters">{t('correspondenceForm.letters')}</option>
                  <option value="Item">{t('correspondenceForm.item')}</option>
                  <option value="Food">{t('correspondenceForm.food')}</option>
                  <option value="Others">{t('correspondenceForm.others')}</option>
                </select>
                <div className="mb-3 mt-3">
                  <label htmlFor="timeOfArrival" className="form-label">{t('correspondenceForm.timeOfArrival')}</label>
                  <input type="datetime-local" className="form-control" id="timeOfArrival" name="timeOfArrival" value={formData.timeOfArrival} onChange={handleChange} required/>
                </div>
                <div className="d-grid gap-1">
                  <button type="submit" className="btn btn-primary mt-3" onClick={redirectUser}>{t('correspondenceForm.addCorrespondence')}</button>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3 order-md-3 rounded-5'>
          {showMsgSuccessAlert && (
          <div className="alert alert-success text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#10004; {t('correspondenceForm.MsgSuccessAlert')}
          </div>
          )}
          {showMsgFaildAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('correspondenceForm.MsgFailAlert')}
          </div>
          )}
          {showInhabitantsFaildAlert && (
          <div className="alert alert-danger text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('correspondenceForm.inhabitantsFailAlert')}
          </div>
          )}
          {showNoInhabitantsAlert && (
          <div className="alert alert-warning text-center position-fixed top-0 end-0 m-3" role="alert" style={{ zIndex: "9999" }}>
            &#9888; {t('correspondenceForm.NoinhabitantsAlert')}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCorrespondenceForm;
