import { useEffect, useState } from "react";
import vendingMachine from "../blockchain/vendingMachine";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [web3, setWeb3] = useState(null);
  const [vmContract, setVmContract] = useState(null);
  const [account, setAccount] = useState(null);
  async function connectWalletHandler() {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      import("web3").then(async ({ default: Web3 }) => {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        setVmContract(vendingMachine(web3));
        const accounts = await web3.eth.getAccounts();
        if (accounts.length) {
          setAccount(accounts[0]);
        }
      });
    }
  }, []);
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>Vending Machine</li>
          </ul>
          <ul>
            <li>
              <button className="connect-wallet" onClick={connectWalletHandler}>
                Connect to wallet
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <Component
        {...pageProps}
        vmContract={vmContract}
        account={account}
        web3={web3}
      />
    </>
  );
}

export default MyApp;
