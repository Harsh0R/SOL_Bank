import React, { useMemo } from 'react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

const WalletContextProvider = ({ children }) => {

    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => {
        if (network == WalletAdapterNetwork.Devnet) {
            return 'https://api.devnet.solana.com'
        }
        return clusterApiUrl(network)
    }, [network])

    const wallets = useMemo(() => [new PhantomWalletAdapter , new SolflareWalletAdapter , new TorusWalletAdapter], [network])

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default WalletContextProvider