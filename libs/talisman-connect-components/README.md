# talisman-connect-components

## Installation:

```
npm i --save @talisman-connect/components
```

## Usage

```tsx
import { WalletSelect } from '@talisman-connect/components';

// Need to import styles as well
import '@talisman-connect/components/talisman-connect-components.esm.css';

<WalletSelect />;
```

## Overriding styles

```css
:root {
  /* ... other styles ... */
  --talisman-modal-border-radius: 0;
  --talisman-modal-padding: 0;
  --talisman-modal-color-background: #fafafa;
  --talisman-modal-color-text: #222;
}
```

## Running unit tests

Run `nx test talisman-connect-components` to execute the unit tests via [Jest](https://jestjs.io).
