import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FakeBaycDetails() {
  const { tokenId } = useParams(); // Récupérer le tokenId depuis l'URL
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    const metadataUrl = `https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${tokenId}`;

    fetch(metadataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch metadata');
        }
        return response.json();
      })
      .then((data) => setMetadata(data))
      .catch((error) => setError(error.message));
  }, [tokenId]);


  if (error) {
    return (
      <div className="error">
        <h1>Error</h1>
        <p>{error}</p>
        <p>Please check if the token ID is correct.</p>
      </div>
    );
  }

  if (!metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Token ID: {tokenId}</h1>
      <img src={metadata.image} alt={`Token ${tokenId}`} />
      <ul>
        {metadata.attributes.map((attr, index) => (
          <li key={index}>
            {attr.trait_type}: {attr.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FakeBaycDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function FakeBaycDetails() {
//   const { tokenId } = useParams(); // Récupère le tokenId depuis l'URL
//   const [metadata, setMetadata] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMetadata = async () => {
//       const metadataUrl = `https://gateway.pinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/${tokenId}.json`; // Remplacez par votre vrai URI de métadonnées
//       try {
//         const response = await fetch(metadataUrl);
//         if (!response.ok) {
//           if (response.status === 404) {
//             throw new Error(`Token #${tokenId} does not exist.`);
//           } else {
//             throw new Error(`Failed to fetch metadata (status: ${response.status}).`);
//           }
//         }
//         const data = await response.json();
//         setMetadata(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMetadata();
//   }, [tokenId]);

//   if (loading) {
//     return <div>Loading metadata for Token #{tokenId}...</div>;
//   }

//   if (error) {
//     return (
//       <div className="error">
//         <h1>Error</h1>
//         <p>{error}</p>
//         <p>Please check if the token ID is correct.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="token-details">
//       <h1>Token #{tokenId}</h1>
//       <img src={metadata.image} alt={`Token #${tokenId}`} />
//       <ul>
//         {metadata.attributes.map((attr, index) => (
//           <li key={index}>
//             <strong>{attr.trait_type}:</strong> {attr.value}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FakeBaycDetails;

