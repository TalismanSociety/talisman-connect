# wallets

## Usage

Installation:

```
npm i --save @talisman/wallets
```

Example:

```
import { getWallets } from '@talisman/wallets';

// Get wallets (Need to be called first):
const supportedWallets = getWallets()

// Subscribe to accounts:
<div>
  {supportedWallets?.map((wallet) => {
    return (
      <div key={wallet.extensionName}>
        <button
          onClick={() =>
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

// Display accounts: (`accounts` are saved via `useState`)
<div>
  {accounts?.map((account) => {
    return (
      <div key={account.address}>
        {account.address}
      </div>
    );
  })}
</div>

```

## Running unit tests

Run `nx test wallets` to execute the unit tests via [Jest](https://jestjs.io).
