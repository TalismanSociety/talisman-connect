# wallets

## Usage

### Installation:

```
npm i --save @talisman/wallets
```

### Get wallets (Need to be called first):

```tsx
import { getWallets } from '@talisman/wallets';

const supportedWallets = getWallets();
```

### Subscribe to accounts:

```tsx
<div>
  {supportedWallets?.map((wallet) => {
    return (
      <div key={wallet.extensionName}>
        <button
          onClick={() =>
            // save "selected" wallet
            wallet.subscribe((accounts) => {
              // save accounts
            })
          }
        >
        </button>
      </div>
    )
  }}
</div>
```

### Display accounts: (`accounts` are saved via `useState`)

```tsx
<div>
  {accounts?.map((account) => {
    return <div key={account.address}>{account.address}</div>;
  })}
</div>
```

### Using the `wallet` object (signing example):

```tsx
try {
  const signer = account.wallet.signer;
  // NOTE: This line will trigger the extension to pop up
  const { signature } = await signer.signRaw({
    type: 'payload',
    data: payload,
    address: account.address,
  });
catch (err) {
  // handle error
}
```

## Contributing new wallets

1. Add wallet under `/src/lib`.
   Example: `/src/lib/foo-wallet/index.ts`
2. Add `class` which implements `Wallet`.
   Example: `export class FooWallet implements Wallet`
3. Add the wallet instance in `supportedWallets` array in `libs/wallets/src/lib/wallets.ts`.

## Running unit tests

Run `nx test wallets` to execute the unit tests via [Jest](https://jestjs.io).
