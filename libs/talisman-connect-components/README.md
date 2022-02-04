# @talisman-connect/components

## Installation:

```
npm i --save @talisman-connect/components
```

## Usage

```tsx
import { WalletSelect } from '@talisman-connect/components';

// Need to import styles as well
import '@talisman-connect/components/talisman-connect-components.esm.css';

<WalletSelect
  onWalletConnectOpen={}
  onWalletConnectClose={}
  onWalletSelected={}
  onUpdatedAccounts={}
  onAccountSelected={}
/>;
```

## Overriding styles

```css
:root {
  /* ... other styles ... */
  --talisman-modal-border-radius: 0;
  --talisman-modal-gutter: 0;
  --talisman-modal-background: #fafafa;
  --talisman-modal-color-text: #222;
}
```

## WalletSelect props

```tsx
interface WalletSelectProps {
  onWalletConnectOpen?: (wallets: Wallet[]) => unknown;
  onWalletConnectClose?: () => unknown;
  onWalletSelected?: (wallet: Wallet) => unknown;
  onUpdatedAccounts?: (accounts: WalletAccount[]) => unknown;
  onAccountSelected: (account: WalletAccount) => unknown;
}
```

Underlying

## Running unit tests

Run `nx test talisman-connect-components` to execute the unit tests via [Jest](https://jestjs.io).
