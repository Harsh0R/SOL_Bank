import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { ChakraProvider, VStack, Link } from '@chakra-ui/react';
import './App.css'
import WalletContextProvider from './Context/WalletContextProvider'
import Navbar from './Components/Navbar/Navbar';
import '@solana/wallet-adapter-react-ui/styles.css'
import Herosection from './Components/Herosection/Herosection';

function App() {
  const [walletAddress, setWalletAddress] = useState()
  const [loading, setLoading] = useState(false)
  const checkIfWalletIsConnected = async () => {
    try {
      setLoading(true)
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({
            onlyIfTrusted: true, //second time if anyone connected it won't show anypop on screen
          });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found!, Get a Phantom Wallet");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {

    checkIfWalletIsConnected()

    return () => {

    }
  }, [])


  return (
    <div>
      <WalletContextProvider>
        <Navbar />
        {walletAddress ? (
          <Herosection />) : (<div>Loading...</div>)
        }
      </WalletContextProvider>
    </div>
  )
}

export default App
