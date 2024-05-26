import React, { useState } from 'react';
import axios from 'axios';
import { extractInfo } from '../Utils.js';

const ScanID = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scanImage = async () => {
    try {
      if (!imageSrc) {
        alert("Select IMG");
        return;
      }

      const scan = process.env.REACT_APP_SCAN;
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${scan}`;

      const base64ImageData = imageSrc.split(',')[1];

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION', model: "builtin/latest", maxResults: 50 }],
          },
        ],
      };

      const apiResponse = await axios.post(url, requestData);
      const data = apiResponse.data.responses[0].textAnnotations[0].description;
      const info = extractInfo(data);
      const url_frequent = `https://dduhalde.online/.netlify/functions/api/frequent_visit/${info.run}`;
      fetch(url_frequent)
      .then(response => response.json())
      .then(data)
      .then(data => {
        // Verificar el valor de affectedRows
        if (data.affectedRows === 0) {
          const url_to_redirect = `/newvisitform?firstName=${info.nombre}&lastName=${info.apellido}&run=${info.run}&dv=${info.dv}`;
          window.location.href = url_to_redirect;
        } else {
          const url_to_redirect = `/adminvisits`;
          window.location.href = url_to_redirect;
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    } catch (error) {
      console.log("Error Analyzing Img", error);
      alert("Error Analyzing Img");
    } 
  };

  return (
    <div id="change" className="container">
      <h1 className="text-center mb-4">SCAN ID</h1>
      <hr className="mb-4"/>
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label">Ingresa una imagen o tomala en el momento</label>
      <input 
        className="form-control" 
        type="file" 
        id="formFile" 
        accept="image/*" 
        capture="camera" 
        onChange={handleFileChange} 
      />
      {imageSrc && (
        <>
        <div className='text-center'>
          <img src={imageSrc} alt="Selected" className="img-thumbnail mt-3" />
        </div>
        <div className='text-center'>
          <button onClick={scanImage} className="btn btn-primary mt-3">Scan Image</button>
        </div>
        </>
      )}
    </div>
    </div>
  );
};

export default ScanID;
