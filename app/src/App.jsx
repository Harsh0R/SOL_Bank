import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { ChakraProvider, VStack, Link } from '@chakra-ui/react';
import './App.css'
import WalletContextProvider from './Context/WalletContextProvider'
import Navbar from './Components/Navbar/Navbar';
import '@solana/wallet-adapter-react-ui/styles.css'
import Herosection from './Components/Herosection/Herosection';

function App() {

  return (
    <div>
      <WalletContextProvider>
        <Navbar />
        <Herosection />
      </WalletContextProvider>
    </div>
  )
}

export default App
