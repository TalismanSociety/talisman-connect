import { useEffect } from "react";
import "./App.css";
import { WalletSelect } from "@talismn/connect-components";
import { PolkadotjsWallet, SubWallet, TalismanWallet, FearlessWallet, EnkryptWallet, NovaWallet } from "@talismn/connect-wallets"
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';


function App() {


  const Accounts = async () => {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const allInjected = await web3Enable('talisman');

    const allExtensions = allInjected.map(({ name, version }) => `${name} ${version}`);

    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    const allAccounts = await web3Accounts();

    console.log(allAccounts)
  }

  useEffect(() => {
    Accounts();
  }, [])

  return (
    <div className="App">
      <WalletSelect
      dappName={"Talisman"}
      // onlyShowInstalled
      // makeInstallable
      walletList={[
        new TalismanWallet(),
        new SubWallet(),
        new FearlessWallet(),
        new EnkryptWallet(),
        new PolkadotjsWallet(),
        new NovaWallet(),
        new SubWallet(),
      ]}
      // onlyShowInstalled
      triggerComponent={
        <button>Open Wallets</button>
      }
      />
    </div>
  );
}

export default App;
