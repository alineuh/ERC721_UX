import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import axios from 'axios';
import FAKE_BAYC_ABI from './FakeBAYC.json';
var abi = FAKE_BAYC_ABI["abi"];

const FakeBaycToken = () => {
  const { tokenId } = useParams();
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenMetadata = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const contract = new Contract(
            "0xdecFAB04fb08cC5da6365C18B26A6B9b1D4BEDFE", // Replace with your contract address
            FAKE_BAYC_ABI,
            provider
          );

          // Fetch the token URI
          const tokenURI = await contract.tokenURI(tokenId);
          const ipfsGateway = 'https://ipfs.io/ipfs/';
          const metadataURI = tokenURI.replace('ipfs://', ipfsGateway);

          // Fetch the metadata from the URI
          const response = await axios.get(metadataURI);
          const data = response.data;

          // Fix IPFS image URI if needed
          if (data.image && data.image.startsWith('ipfs://')) {
            data.image = data.image.replace('ipfs://', ipfsGateway);
          }

          setMetadata(data);
        } catch (err) {
          setError(`Token with ID ${tokenId} does not exist or metadata could not be retrieved.`);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Ethereum wallet (e.g., MetaMask) is not installed.');
        setLoading(false);
      }
    };

    fetchTokenMetadata();
  }, [tokenId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
        <h2>No metadata found</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{metadata.name}</h1>
      {metadata.image && (
        <img
          src={metadata.image}
          alt={metadata.name}
          style={{ maxWidth: '300px', margin: '20px 0', borderRadius: '10px' }}
        />
      )}
      <p>{metadata.description}</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Attributes:</h3>
        {metadata.attributes?.map((attr, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{attr.trait_type}:</strong> {attr.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeBaycToken;