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
  triggerComponent={
    <button
      onClick={(wallets) => {
        // Do stuff with the supported wallets
      }}
    >
      Connect to wallet
    </button>
  }
  onWalletConnectOpen={}
  onWalletConnectClose={}
  onWalletSelected={}
  onUpdatedAccounts={}
  onAccountSelected={}
/>;
```

## Using the `WalletConnectButton` independently

```tsx
<WalletConnectButton onClick={(wallets) => {}}>
  Connect wallet
</WalletConnectButton>
```

## Overriding styles (Example)

NOTE: By default `WalletSelect` modal is appended in the `document.body`.
So if your base styles (i.e `font-family`, `color`, etc.) are done from `html` and/or `body` for example,
then `WalletSelect` will inherit the correct styles.

Otherwise, if styles are done off some `div` inside the `body`, then provide the `appId` prop in `WalletSelect`.

```css
:root {
  /* ... other styles ... */

  /* Light theme */
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

  --talisman-connect-modal-width: 90%;
  --talisman-connect-modal-max-width: 470px;
  --talisman-connect-modal-max-height: 470px;

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
