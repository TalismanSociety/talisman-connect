# @talisman-connect/wallets

## Setup:

```
npm i --save @talisman-connect/wallets
```

## `getWallets(): Wallet[]`

Retrieves all the supported wallets. Needs to be called first before everything else.

```tsx
import { getWallets } from '@talisman-connect/wallets';

const supportedWallets = getWallets();
```

## `getWalletBySource(source: string): Wallet`

Retrieves the wallet by extension name (source).
Useful if `account` object is not available.

## `wallet.extension`

This is the main object that Dapp developers will need to interface.

Refer to the appropriate documentation on what the object has to offer. Example `BaseDotsamaWallet.extension()`.

## `wallet.signer`

This is for convenience and is derived from the `wallet.extension`.

## `wallet.enable(dappName)`

Needs to be called first before `subscribeAccounts`. Connects to the wallet extension.

This will trigger the extension to pop-up if it's the first time being enabled.

```tsx
try {
  await wallet.enable(dappName);
} catch (err) {
  // Handle error. Refer to `libs/wallets/src/lib/errors`
}
```

## `wallet.subscribeAccounts(callback): UnsubscribeFn`

Subscribe to the wallet's accounts.

NOTE: Call the returned `unsubscribe` function on unmount.

```tsx
<div>
  {supportedWallets?.map((wallet) => {
    return (
      <div key={wallet.extensionName}>
        <button
          onClick={() => {
            try {
              await wallet.enable(YOUR_DAPP_NAME);

              // save "selected" wallet
              const unsubscribe = await wallet.subscribeAccounts((accounts) => {
                // save "accounts"
              })
            } catch (err) {
              // Handle error. Refer to `libs/wallets/src/lib/errors`
            }
          }}
        >
        </button>
      </div>
    )
  }}
</div>
```

## Using the `wallet` object (signing example):

```tsx
try {
  // NOTE: Can also use `getWalletBySource` to get the wallet then the signer.
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

## Interfaces

Refer to `libs/wallets/src/types.ts`.

## Contributing new wallets

1. Add wallet under `/src/lib`. (i.e. `/src/lib/foo-wallet/index.ts`)
2. Add a `class` which implements `Wallet`. (i.e. `export class FooWallet implements Wallet`)
3. Add the wallet instance in `supportedWallets` array in `libs/wallets/src/lib/wallets.ts`.
4. IMPORTANT: The `logo` should not exceed 10KB (will be inlined)

NOTE: There may be 2 or more wallets that share a common wallet interface. It is recommended to create a base class in this case.

Refer to `BaseDotsamaWallet` for an example base class and its derived classes.

## Troubleshooting

If in case there is an error parsing `import.meta`, please add the following to webpack config:

```js
webpackConfig.module.rules.push({
  test: /\.js$/,
  loader: require.resolve('@open-wc/webpack-import-meta-loader'),
});
```

For "unejected" Create React App projects, please see `craco.config.js` below:

```js
// craco.config.js
// Solution comes from https://polkadot.js.org/docs/usage/FAQ/#on-webpack-4-i-have-a-parse-error-on-importmetaurl
const ImportMetaLoaderPlugin = {
  plugin: {
    overrideWebpackConfig: ({ webpackConfig }) => {
      if (!webpackConfig.module) webpackConfig.module = { rules: [] };
      if (!webpackConfig.module.rules) webpackConfig.module.rules = [];
      webpackConfig.module.rules.push({
        test: /\.js$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader'),
      });

      return webpackConfig;
    },
  },
};

module.exports = {
  plugins: [ImportMetaLoaderPlugin],
};
```

## Running unit tests

Run `nx test wallets` to execute the unit tests via [Jest](https://jestjs.io).
