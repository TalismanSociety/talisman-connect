## Troubleshooting

### Talisman Extension (< 0.9.1) not detected by `WalletSelect` Modal

Steps to enable localhost Talisman Extension:

0. Ensure Talisman Extension is installed and browser refreshed after install.
1. Open manifest.json in the extension folder.
2. Append `http://localhost:*/*` to wherever there’s `https://*/*`.

```
Example:
  "content_scripts": [
    {
      "matches": ["https://*/*", "http://localhost:*/*"],
    }
  ],
  "permissions": ["https://*/*", "http://localhost:*/*", "storage", "tabs"],
```

3. On chrome://extensions (or brave://extensions), reload the Talisman extension.
4. On your Dapp, refresh the browser.

## Error parsing `import.meta`

In the case there is an error parsing `import.meta` and/or private class fields error, try adding the following to webpack config below.

Example for "unejected" Create React App projects, please see `craco.config.js` below:

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

const BabelPlugin = {
  plugin: {
    overrideCracoConfig: ({ cracoConfig }) => {
      if (!cracoConfig.babel) cracoConfig.babel = {};
      if (!Array.isArray(cracoConfig.babel.plugins))
        cracoConfig.babel.plugins = [];

      cracoConfig.babel.plugins.push('@babel/plugin-proposal-class-properties');
      cracoConfig.babel.plugins.push('@babel/plugin-proposal-private-methods');

      return cracoConfig;
    },
  },
};

module.exports = {
  plugins: [BabelPlugin, ImportMetaLoaderPlugin],
};
```
