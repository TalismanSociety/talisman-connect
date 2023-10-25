import { useEffect } from "react";
import "./App.css";
import { WalletSelect } from "@talismn/connect-components";
import { PolkadotjsWallet, SubWallet, TalismanWallet, FearlessWallet, EnkryptWallet, PolkaGate, MantaWallet, AlephZeroWallet } from "@talismn/connect-wallets"


function App() {
  return (
    <div className="App">
      <WalletSelect
      dappName={"Talisman"}
      // onlyShowInstalled
      // makeInstallable
      walletList={[
        new TalismanWallet(),
        new SubWallet(),
        new MantaWallet(),
        new PolkaGate(),
        new FearlessWallet(),
        new EnkryptWallet(),
        new PolkadotjsWallet(),
        new AlephZeroWallet()
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
