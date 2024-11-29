import React from 'react';

const Error = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#f8d7da', 
      color: '#721c24', 
      textAlign: 'center',
      padding: '20px' 
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        🚫 Oops! Wrong Network
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
        Please connect to the <strong>Holsky network</strong> and try again.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        style={{ 
          backgroundColor: '#f5c6cb', 
          color: '#721c24', 
          padding: '10px 20px', 
          fontSize: '1rem', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;