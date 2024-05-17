import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const ScanID = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { t } = useTranslation();
  const [showData, setShowData] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Aquí se implementará la lógica para subir la fotografía del carnet
    setShowData(true); 
  };

  return (
    <div className="formContainer d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4">
        <div className="uploadContainer text-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control-file fileInput"
          />
          <span className="fileInputLabel">
            {selectedFile ? selectedFile.name : t('ScanID.noFileChosen')}
          </span>
        </div>
        <div className="mt-4 text-center">
          <button onClick={handleUpload} className="btn btn-primary uploadButton">
            {t('ScanID.uploadbutton')}
          </button>
        </div>
        {showData && (
          <div className="personInfo mt-4 border p-4">
            <h3>{t('ScanID.uploadedInfo')}</h3>
            {/* Info despues de cargar imagen */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanID;
