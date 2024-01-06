import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankLoginPage.css'; // Import the CSS file for styling

const Registration = () => {
    const navigate = useNavigate();
  const [faceId, setFaceId] = useState(null);
  const [voiceId, setVoiceId] = useState(null);
  // const [palmId, setPalmId] = useState(null);
  const [fingerprintId, setFingerprintId] = useState(null);

  const handleFaceIdChange = (e) => {
    setFaceId(e.target.files[0]);
  };

  const handleVoiceIdChange = (e) => {
    setVoiceId(e.target.files[0]);
  };

  // const handlePalmIdChange = (e) => {
    // setPalmId(e.target.files[0]);
  // };

  const handleFingerprintIdChange = (e) => {
    setFingerprintId(e.target.files[0]);
  };

  

  const handleRegistration = async () => {
    try {
      // Call backend APIs for different ID types
      const responseFaceId = await uploadFile(faceId, 'faceId');
      const responseVoiceId = await uploadFile(voiceId, 'voiceId');
      // const responsePalmId = await uploadFile(palmId, 'palmId');
      const responseFingerprintId = await uploadFile(fingerprintId, 'fingerprintId');

      // Check if all APIs were successful
      if (responseFaceId.result_faces[0] && responseVoiceId  && responseFingerprintId) {
       
        navigate('/');
        console.log('Registration successful');
        // Navigate to the landing page
        // You can use a library like react-router-dom for navigation
        // Example: history.push('/landing');
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during Registration:', error);
    }
  };

  const uploadFile = async (file, fileType) => {
    // Implement your API call logic here for uploading files
    // Make sure to handle the response appropriately
    // Example using fetch:
    const formData = new FormData();
    formData.append(fileType, file);

    const response = await fetch(`http://127.0.0.1:5000/${fileType}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  };

  return (
    <div className="bank-registration-container">
      <div className="bank-registration-form">
        <h2>Register</h2>
        

        <label htmlFor="voiceId">Voice ID:</label>
        <input type="file" id="voiceId" onChange={handleVoiceIdChange} />

        <label htmlFor="faceId">Face Password:</label>
        <input type="file" id="faceId" onChange={handleFaceIdChange} />

        <label htmlFor="fingerprintId">Fingerprint Password:</label>
        <input type="file" id="fingerprintId" onChange={handleFingerprintIdChange} />

        <button onClick={handleRegistration}>Register</button>
    
        <p>Already have account? <a href="/">Login here</a></p> 
      </div>
    </div>
  );
};

export default Registration;
