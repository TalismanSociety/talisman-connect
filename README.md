# @talisman-connect

This is the monorepo for the Talisman Connect project.

This project aims to provide the components necessary for Dapp developers to be able to quickly connect to wallets in the Polkadot and Kusama ecosystems.

## Quick Start

#### Install the package:
```
npm i --save @talisman-connect/wallets
```

#### Example
```js
import { getWallets } from '@talisman-connect/wallets';

// returns a list of all the extensions currently installed in the window
assert(window.injectedWeb3, "No wallets installed.")
const supportedWallets = getWallets();

// choose one of the extensions from the list
// this can be done through a UI component...
const walletToUse = supportedWallets['Talisman'] // example

// enable the wallet
const wallet = await walletToUse.enable('my dapp')

// sign a message
try {
  const signer = wallet.signer;

  // NOTE: Trigger the extension popup
  const { signature } = await signer.signRaw({
    type: 'payload',
    data: 'Some data to sign...',
    address: account.address,
  });
} catch (err) {
  // Handle error...
}

});
```

## Packages

### For Dapps with an existing wallet connection UIs:

- [`@talisman-connect/wallets`](https://github.com/TalismanSociety/talisman-connect/tree/master/libs/wallets)

### For Dapps without an existing wallet connection UI:

- [`@talisman-connect/components`](https://github.com/TalismanSociety/talisman-connect/tree/master/libs/talisman-connect-components)

### Generic UIs that can be used for any Dapps:

- [`@talisman-connect/ui`](https://github.com/TalismanSociety/talisman-connect/tree/master/libs/talisman-connect-ui)

## Setup

NOTE: We recommend `yarn`

```
yarn
yarn start
```

Run app on `localhost:4200`.

This is a playground Dapp that showcases the `WalletSelect` Modal which uses the packages listed above.

## Troubleshooting

Check out our [`Troubleshooting instructions`](https://github.com/TalismanSociety/talisman-connect/blob/master/troubleshooting.md)
