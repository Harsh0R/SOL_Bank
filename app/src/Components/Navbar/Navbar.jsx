import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

const Navbar = () => {
  return (
    <div>
        <h3>Connect Wallet</h3>
        <WalletMultiButton/>
    </div>
  )
}

export default Navbar