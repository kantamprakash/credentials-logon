import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BankLoginPage.css'; // Import the CSS file for styling

const Login = () => {
    const navigate = useNavigate();
  const [faceId, setFaceId] = useState(null);
  const [voiceId, setVoiceId] = useState(null);
  const [palmId, setPalmId] = useState(null);

  const handleFaceIdChange = (e) => {
    setFaceId(e.target.files[0]);
  };

  const handleVoiceIdChange = (e) => {
    setVoiceId(e.target.files[0]);
  };

  const handlePalmIdChange = (e) => {
    setPalmId(e.target.files[0]);
  };

  const handleLogin = async () => {
    try {
      // Call backend APIs for different ID types
      const responseFaceId = await uploadFile(faceId, 'faceId');
      const responseVoiceId = await uploadFile(voiceId, 'voiceId');
      const responsePalmId = await uploadFile(palmId, 'palmId');

      // Check if all APIs were successful
      if (responseFaceId.result_faces[0] && responseVoiceId && responsePalmId) {
       
        navigate('/landing');
        console.log('Login successful');
        // Navigate to the landing page
        // You can use a library like react-router-dom for navigation
        // Example: history.push('/landing');
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
    <div className="bank-login-container">
      <div className="bank-login-form">
        <label htmlFor="faceId">Face ID:</label>
        <input type="file" id="faceId" onChange={handleFaceIdChange} />

        <label htmlFor="voiceId">Voice ID:</label>
        <input type="file" id="voiceId" onChange={handleVoiceIdChange} />

        <label htmlFor="palmId">Palm ID:</label>
        <input type="file" id="palmId" onChange={handlePalmIdChange} />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
