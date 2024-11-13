# @talismn/connect-components

The Wallet Connection UI is core to all Dapps in existence.

Every Dapp developer will have to implement logic and edge cases of connecting to different wallets which may take days to implement.

The `WalletSelect` component in `@talismn/connect-components` will be a massive time saver for Dapp developers without an existing wallet selection ui.

If you have an existing modal, the `WalletSelectButton` in `@talismn/connect-components` may be better suited to your needs.

If you require a bespoke ui modal, you can use the `@talismn/connect-wallets` to build out your own modal.

More components will be developed along the way.

## Setup:

```
pnpm add @talismn/connect-components @talismn/connect-wallets @talismn/connect-ui
```

## Usage

### [Important] Replace related functions from `@polkadot/extension-dapp`

If there are multiple PolkadotJS based browser extensions installed,
the `web3Enable` function will trigger multiple popups as well.

This is not ideal for dapps that have one wallet active at one time.

So we need to remove calls to `web3Enable`.

However, calls to `web3*` functions from `@polkadot/extension-dapp` will not work anymore once `web3Enable` is removed.

Only `web3FromSource` has a drop-in replacement for now. Please see below for an example.

If you have calls to `web3FromAddress`, do note that `web3FromSource` will suffice as all the addresses will be from the same "source" anyway.

### WalletSelect

This component is the wallet selection modal.

```tsx
import { WalletSelect } from '@talismn/connect-components';

return <WalletSelect
  // [Required] The dapp name
  dappName="My First Dapp"

  // Use if the dapp is controlling the modal toggle.
  open={true}

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

  // Override the default header
  header={}

  // Override the default footer
  footer={}

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

### web3FromSource

This function is a drop-in replacement for the `@polkadot/extension-dapp` version which triggers multiple popups.

This uses the localStorage value for `@talisman-connect/selected-wallet-name` which is updated by `WalletSelect` or `WalletSelectButton` and retrieves the extension object.

```tsx
import { web3FromSource } from '@talismn/connect-components'

// This is the object that cointains the `signer` amongs all others.
const injector = web3FromSource()
```

### WalletSelectButton (WIP)

This component is the actual wallet selector. You can use this is if you have an existing modal. However, we do recommend using `WalletSelect` in general.

```tsx
import { WalletSelectButton } from '@talismn/connect-components'
import { TalismanWallet } from '@talismn/connect-wallets'

const talismanWallet = new TalismanWallet()

return (
  <WalletSelectButton
    wallet={talismanWallet}
    onClick={(accounts) => {
      // accounts === undefined is an Error state
    }}
  >
    <img
      width={32}
      height={32}
      src={talismanWallet.logo.src}
      alt={talismanWallet.logo.alt}
    />
    {talismanWallet.title}
  </WalletSelectButton>
)
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

## Adding new wallets into the `WalletSelect` Modal

Refer to [`@talismn/connect-wallets`](https://github.com/TalismanSociety/talisman-connect/tree/main/packages/connect-wallets) for more details.

## Dependencies:

- [`@talismn/connect-wallets`](https://github.com/TalismanSociety/talisman-connect/tree/main/packages/connect-wallets)
- [`@talismn/connect-ui`](https://github.com/TalismanSociety/talisman-connect/tree/main/packages/connect-ui)

## Troubleshooting

If in case there is an error parsing `import.meta`, please add the following to webpack config:

```js
webpackConfig.module.rules.push({
  test: /\.js$/,
  loader: require.resolve('@open-wc/webpack-import-meta-loader'),
})
```

For "unejected" Create React App projects, please see `craco.config.js` below:

```js
// craco.config.js
// Solution comes from https://polkadot.js.org/docs/usage/FAQ/#on-webpack-4-i-have-a-parse-error-on-importmetaurl
const ImportMetaLoaderPlugin = {
  plugin: {
    overrideWebpackConfig: ({ webpackConfig }) => {
      if (!webpackConfig.module) webpackConfig.module = { rules: [] }
      if (!webpackConfig.module.rules) webpackConfig.module.rules = []
      webpackConfig.module.rules.push({
        test: /\.js$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader'),
      })

      return webpackConfig
    },
  },
}

module.exports = {
  plugins: [ImportMetaLoaderPlugin],
}
```
