# @talisman-connect

This is the monorepo for the Talisman Connect project. Refer to the packages below for more details.

## Packages

- `@talisman-connect/components`
- `@talisman-connect/wallets`
- `@talisman-connect/ui`

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

- Github actions for CI/CD publishing packages.
- Add more reusable UI components and hooks into `@talisman-connect/ui`
- `.gif` support in `libs`
- ...more
