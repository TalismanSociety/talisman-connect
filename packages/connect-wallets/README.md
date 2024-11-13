# @talismn/connect-wallets

This package provides the building blocks for wallet connection UIs.

Dapps currently use the `@polkadot/extension-dapp` package with `web3Enable`.

While it is a great way to enable all wallets at once, it does cause multiple unnecessary wallet extension popups.

This is not a problem when it was just Polkadot.js extension. But now with Talisman and possibly some other wallet extensions coming in, the multiple popups is not desirable.

Furthermore, most use cases, one wallet is selected (and enabled) at one time.

`@talismn/connect-wallets` aims to solve this issue.

## Setup:

```bash
# Using npm
npm install --save @talismn/connect-wallets
# Using bun
bun add @talismn/connect-wallets
# Using pnpm
pnpm add @talismn/connect-wallets
# Using yarn
yarn add @talismn/connect-wallets
```

## Quick Start:

### Wallet Selector UI

```tsx
import { getWallets } from '@talismn/connect-wallets';

const DAPP_NAME = /* Get Dapp name */

// ...

const MyWalletSelector = () => {
  const supportedWallets: Wallet[] = getWallets();
  return (
    <div>
      {supportedWallets.map((wallet: Wallet) => {
        <button
          key={wallet.extensionName}
          onClick={async () => {
            try {
              await wallet.enable(DAPP_NAME);
              const unsubscribe = await wallet.subscribeAccounts((accounts: WalletAccount[]) => {
                // Save accounts...
                // Also save the selected wallet name as well...
              });
            } catch (err) {
              // Handle error. Refer to `packages/connect-wallets/src/lib/errors`
            }
          }}
        >
          Connect to {wallet.title}
        </button>
      })}
    <div>
  );
}
```

### Example: Signing a message

```tsx
try {
  // NOTE: If `account` object is not handy, then use `getWalletBySource` to get the wallet then the signer.
  const signer = account.wallet.signer

  // NOTE: This line will trigger the extension popup
  const { signature } = await signer.signRaw({
    type: 'payload',
    data: 'Some data to sign...',
    address: account.address,
  })
} catch (err) {
  // Handle error...
}
```

## Functions

### `getWallets(): Wallet[]`

Retrieves all the supported wallets.

### `getWalletBySource(source: string): Wallet`

Retrieves the wallet by extension name (source). Useful if `account: WalletAccount` object is not available.

### `wallet.enable(dappName)`

Needs to be called first before `subscribeAccounts`. Connects to the wallet extension.

This will trigger the extension to popup if it's the first time being enabled.

### `wallet.getAccounts(anyType?: boolean): Promise<WalletAccount[]>`

Get wallet's accounts.

### `wallet.subscribeAccounts(callback): UnsubscribeFn`

Subscribe to the wallet's accounts.

NOTE: Call the returned `unsubscribe` function on unmount.

### `wallet.extension`

This is the main object that Dapp developers will need to interface.

Refer to the appropriate documentation on what the object has to offer.

Example in `BaseDotsamaWallet.extension()`.

### `wallet.signer`

This is for convenience and is derived from the `wallet.extension`.

## Interfaces

Refer to `packages/connect-wallets/src/types.ts`.

## Contributing new wallets

1. Add wallet under `packages/connect-wallets/src/lib/`. (i.e. `packages/connect-wallets/src/lib/foo-wallet/index.ts`)
2. Add a `class` which implements `Wallet`. (i.e. `export class FooWallet implements Wallet`)
3. Add the wallet instance in `supportedWallets` array in `packages/connect-wallets/src/lib/wallets.ts`.
4. IMPORTANT: The `logo` should not exceed 10KB (will be inlined)

NOTE: There may be 2 or more wallets that share a common wallet interface. It is recommended to create a base class in this case.

Refer to `BaseDotsamaWallet` for an example base class and its derived classes.
