import React, { useState } from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';

const ScanID = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { t } = useTranslation();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // TODO logic for uploading ID Card
  };

  return (
    <div className="scanIDContainer">
      <h1 className="scanIDTitle">{t('ScanID.title')}</h1>
      <div className="uploadContainer">
        <input
          type="file"
          onChange={handleFileChange}
          className="fileInput"
        />
        <span className="fileInputLabel">
          {selectedFile ? selectedFile.name : t('ScanID.noFileChosen')}
        </span>
      </div>
      <button onClick={handleUpload} className="uploadButton">
        {t('ScanID.uploadbutton')}
      </button>
    </div>
  );
};

export default ScanID;
