import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const ChainInfo = () => {
  const [chainId, setChainId] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Connect to MetaMask and get chain information
  useEffect(() => {
    const getChainInfo = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);

          // Request user account and chain information
          const accounts = await provider.send("eth_requestAccounts", []);
          const currentChainId = await provider.getNetwork();
          const latestBlock = await provider.getBlockNumber();

          // Set state with the fetched data
          setUserAddress(accounts[0]);
          setChainId(currentChainId.chainId.toString());

          console.log(chainId)

          if (currentChainId.chainId.toString() !== "17000") {
            window.location.href="/error"; 
          }

          setBlockNumber(latestBlock);
        } catch (err) {
          setErrorMessage("Error fetching chain info. Make sure you're connected to the Holesky network.");
        }
      } else {
        setErrorMessage("MetaMask is not installed.");
      }
    };

    getChainInfo();
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (  
    <div>
      <h2>Chain Information</h2>
      <p><strong>Chain ID:</strong> {chainId}</p>
      <p><strong>Last Block Number:</strong> {blockNumber}</p>
      <p><strong>User Address:</strong> {userAddress}</p>
    </div>
  );
};

export default ChainInfo;
