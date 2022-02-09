# @talisman-connect/components

## Setup:

### npm

```
npm i --save @talisman-connect/components @talisman-connect/wallets @talisman-connect/ui
```

### yarn

```
yarn add @talisman-connect/components @talisman-connect/wallets @talisman-connect/ui
```

## Usage

### [Important] Import styles from the App level

```tsx
import '@talisman-connect/components/talisman-connect-components.esm.css';
import '@talisman-connect/ui/talisman-connect-ui.esm.css';
```

```tsx
import { WalletSelect } from '@talisman-connect/components';

<WalletSelect
  // The component that opens the WalletSelect Modal
  triggerComponent={
    <button
      // `onClick` is optional here
      onClick={(wallets) => {
        // Do stuff with the supported wallets
      }}
    >
      Connect to wallet
    </button>
  }

  // If `showAccountsList={true}`, then account selection modal will show up after selecting the a wallet. Default is `false`.
  showAccountsList={false}

  // Callback when the WalletSelect Modal is opened
  onWalletConnectOpen={(wallets) => { ... }}

  // Callback when the WalletSelect Modal is closed
  onWalletConnectClose={() => { ... }}

  // Callback when a wallet is selected on the WalletSelect Modal
  onWalletSelected={(wallet) => { ... }}

  // Callback when the subscribed accounts for a selected wallet are updated
  onUpdatedAccounts={(accounts) => { ... }}

  // Callback when an account is selected on the WalletSelect Account Modal. Only relevant when `showAccountsList=true`
  onAccountSelected={(account) => { ... }}

  // Callback when an error occurs. Also clears the error on Modal actions:
  // `onWalletConnectOpen`, `onWalletSelected`, `onAccountSelected` and `onWalletConnectClose`,
  onError={(error) => { ... }}
/>;
```

## Events and persistence

### `@talisman-connect/selected-wallet-name` (LocalStorage)

Description:
Updated on `WalletSelect.onWalletSelected` ONLY if there are no errors for the selected wallet.

Removing this item will be equivalent to a "disconnection" behaviour for Dapps.

### `@talisman-connect/wallet-selected` (CustomEvent)

Description:
Dispatched on `WalletSelect.onWalletSelected` ONLY if there are no errors for the selected wallet.

Params: `{ detail: Wallet }`

To listen to this event:

```
document.addEventListener('@talisman-connect/wallet-selected', function() {
  // ...
})
```

## Overriding styles (Example)

NOTE: By default `WalletSelect` modal is appended as the last child of `document.body`.

So if your base styles (i.e `font-family`, `color`, etc.) are done from `html` and/or `body` for example,
then `WalletSelect` will inherit the correct styles.

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

References:
`@talisman-connect/wallets`
`@talisman-connect/ui`

## Running unit tests

Run `nx test talisman-connect-components` to execute the unit tests via [Jest](https://jestjs.io).
