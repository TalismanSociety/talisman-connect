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
  triggerComponent={}
  onWalletConnectOpen={}
  onWalletConnectClose={}
  onWalletSelected={}
  onUpdatedAccounts={}
  onAccountSelected={}
/>;
```

## Overriding styles (Example)

NOTE: By default `WalletSelect` modal is appended in the `document.body` and might be outside of the App's `root` div. So

```css
:root {
  /* ... other styles ... */

  /* Default: Light mode */
  --talisman-connect-control-background: #f2f2f2;
  --talisman-connect-control-foreground: inherit;
  --talisman-connect-active-background: #e5e5e5;
  --talisman-connect-active-foreground: inherit;
  --talisman-connect-modal-background: #fafafa;
  --talisman-connect-modal-foreground: inherit;
  --talisman-connect-button-background: var(
    --talisman-connect-control-background
  );
  --talisman-connect-button-foreground: inherit;

  --talisman-connect-modal-gutter: 2rem;
  --talisman-connect-font-family: sans-serif;
  --talisman-connect-border-radius: 1rem;

  --talisman-connect-modal-min-width: 320px;
  --talisman-connect-modal-max-width: 320px;
  --talisman-connect-modal-min-height: 768px;
  --talisman-connect-modal-max-height: 1000px;

  --talisman-connect-button-gutter: 1rem;
  --talisman-connect-button-border-radius: 0.75rem;
}

.dark-mode {
  --talisman-connect-control-background: #383838;
  --talisman-connect-control-foreground: inherit;
  --talisman-connect-active-background: #5a5a5a;
  --talisman-connect-active-foreground: inherit;
  --talisman-connect-modal-background: #222;
  --talisman-connect-modal-foreground: #fafafa;
  --talisman-connect-button-background: var(
    --talisman-connect-control-background
  );
  --talisman-connect-button-foreground: #fafafa;
}

@media (min-width: 768px) {
  :root {
    --talisman-connect-modal-min-width: 470px;
    --talisman-connect-modal-max-width: 470px;
  }
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

NOTE: Refer to `@talisman-connect/wallets` for the underlying classes and logic

## Running unit tests

Run `nx test talisman-connect-components` to execute the unit tests via [Jest](https://jestjs.io).
