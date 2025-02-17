import "./App.css";
import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as anchor from "@project-serum/anchor";
import Navbar from "./components/Navbar";
import Mint from "./pages/Mint";
import { DEFAULT_TIMEOUT } from "./services/connection";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

import { ThemeProvider, Paper } from "@material-ui/core";

import theme from "./components/Theme";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!
    );

    return candyMachineId;
  } catch (e) {
    console.log("Failed to construct CandyMachineId", e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Router>
              <Paper style={{ backgroundColor: "black" }}>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route
                    path="/mint"
                    element={
                      <Mint
                        candyMachineId={candyMachineId}
                        connection={connection}
                        txTimeout={DEFAULT_TIMEOUT}
                        rpcHost={rpcHost}
                      />
                    }
                  /> */}
                </Routes>
                <Footer />
              </Paper>
            </Router>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
};

export default App;
