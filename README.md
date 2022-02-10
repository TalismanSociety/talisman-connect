# @talisman-connect

This is the monorepo for the Talisman Connect project. Refer to the packages below for more details.

## Packages

- [`@talisman-connect/components`](https://github.com/TalismanSociety/talisman-connect/tree/master/libs/talisman-connect-components)
- [`@talisman-connect/wallets`](https://github.com/TalismanSociety/talisman-connect/tree/master/libs/talisman-connect-wallets)
- [`@talisman-connect/ui`](https://github.com/TalismanSociety/talisman-connect/tree/master/libs/talisman-connect-ui)

## Setup

NOTE: We recommend `yarn`

```
yarn
yarn start
```

Run app on `localhost:4200`.

This is a barebones Dapp that showcases the `WalletSelect` Modal which uses the packages above.

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
- Licence
- Ditch `web3Enable` usage in Web App and replace with the a-la carte version.

**Long term**

- Move other projects from different repos into this monorepo.
