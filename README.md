# @talisman-connect

This is the monorepo for the Talisman Connect project.

This project aims to provide the components necessary for Dapp developers to be able to quickly connect to wallets in the Polkadot and Kusama ecosystems.

## Quick Start

#### Install the package:
```
npm i --save @talisman-connect/wallets
```

#### Example
```
import { getWallets } from '@talisman-connect/wallets';

// usually the 
window.injectedWeb3 && window.injectedWeb3['subwallet-js']

const chosenExtension = window.injectedWeb3['subwallet-js']
const extension = await SubWalletExtension.enable()

// returns a list of all the extensions currently installed in the window
assert(window.injectedWeb3, "No wallets installed.")
const supportedWallets = getWallets();

// choose one of the extensions from the list
// this can be done through a UI component...
const walletToUse = supportedWallets['Talisman'] // example

// enable the wallet
const wallet = await walletToUse.enable('my dapp')

// subscribe to accounts
const unsubscribe = await wallet.subscribeAccounts(accounts => {
  // Save accounts...
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

### Talisman Extension (< 0.9.1) not detected by `WalletSelect` Modal

Steps to enable localhost Talisman Extension:

0. Ensure Talisman Extension is installed and browser refreshed after install.
1. Open manifest.json in the extension folder.
2. Append `http://localhost:*/*` to wherever there’s `https://*/*`.

```
Example:
  "content_scripts": [
    {
      "matches": ["https://*/*", "http://localhost:*/*"],
    }
  ],
  "permissions": ["https://*/*", "http://localhost:*/*", "storage", "tabs"],
```

3. On chrome://extensions (or brave://extensions), reload the Talisman extension.
4. On your Dapp, refresh the browser.

## Build

NOTE: Dependencies will be added as `peerDependencies`

```
yarn build
```

## Manually publishing a package (Example)

NOTE: This assumes your local `npm` is authorized to publish

```
cd dist/libs/talisman-connect-ui
npm publish --access public
```

## TODO

**Monorepo**:

- Add styleguidist for automated components docs
- Github actions for CI/CD publishing packages.
- Auto bump package.json version.
- `.gif` support in `libs`
- Export styles from `libs` properly

**`@talisman-connect/ui`**

- Add more reusable UI components and hooks

**`@talisman-connect/components`**

- `WalletSelect` support additional footer.
- `WalletSelect` figure out "no wallet link".
- `WalletConnectButton` maybe deprecate and remove.
- Error UI (or Error Boundaries)

**`@talisman-connect/wallets`**

- Figure out if we can move `@polkadot/extension-dapp` to peerDependecies.
- Make `wallet.subscribeAccounts` emit a CustomEvent.
- Make `wallet.enable` emit a CustomEvent.

**General**

- VueJS version
- WebComponents version
- Github "Code of Conduct" for contributors
- [DONE] Licence
- [DONE] Ditch `web3Enable` usage in Web App and replace with the a-la carte version.

**Long term**

- Move other projects from different repos into this monorepo.
