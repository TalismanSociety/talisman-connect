import './App.css'

import { WalletSelect } from '@talismn/connect-components'
import {
  AlephZeroWallet,
  EnkryptWallet,
  FearlessWallet,
  MantaWallet,
  NovaWallet,
  PolkadotjsWallet,
  PolkaGate,
  SubWallet,
  TalismanWallet,
} from '@talismn/connect-wallets'

function App() {
  return (
    <div className="App">
      <WalletSelect
        dappName="Talisman"
        // onlyShowInstalled
        // makeInstallable
        walletList={[
          new TalismanWallet(),
          new NovaWallet(),
          new SubWallet(),
          new MantaWallet(),
          new PolkaGate(),
          new FearlessWallet(),
          new EnkryptWallet(),
          new PolkadotjsWallet(),
          new AlephZeroWallet(),
        ]}
        triggerComponent={<button>Open Wallets</button>}
      />
    </div>
  )
}

export default App
