# @talisman-connect/extension-dapp

## Rationale:

The `web3Enable` from `@polkadot/extension-dapp` enables ALL providers in the `injectedWeb3` object.
Dapps using `web3Enable` for the first time will trigger multiple auth pop-ups if there are multiple extensions installed which is not a good user experience.

This package adds a new function `web3EnableOne(extensionName, originName, compatInits?)` as a replacement for `web3Enable`.

The other web3\* functions should still work as-is.

## Steps:

1. yarn remove @polkadot/extension-dapp
2. yarn add @talisman-connect/extension-dapp
3. Replace import/require `@polkadot/extension-dapp` with `@talisman-connect/extension-dapp`.
4. Replace `web3Enable` call with `web3Enable("the-extension-name")`

Documentation available [in the polkadot-js doc](https://polkadot.js.org/docs/extension).
