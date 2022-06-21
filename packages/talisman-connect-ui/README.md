# @talismn/ui

## Setup:

```
npm i --save @talismn/ui
```

## Components

### `Modal`

Example

```tsx
import { Modal } from '@talismn/ui';


<Modal
  className={}

  // The Modal title
  title={}

  // The Modal toggle
  isOpen={false}

  // The id where the Modal is appended. By default, it's appended to document.body.
  appId=""

  // Callback on Modal close
  handleClose={() => { ... }}

  // [Optional] Callback on Modal back button click. Used with a multi modal setup.
  handleBack={() => { ... }}
>
  <div>The modal body</div>
</Modal>
```

## Hooks

### `useLocalStorage`

Use localStorage values with ease.

```tsx
import { useLocalStorage } from '@talismn/ui';
const Dummy = () => {
  const [value, setValue] = useLocalStorage('dummy-key');
  return (
    <button onClick={() => setValue('Dummy')}>{value || 'Click Me'}</button>
  );
};
```

### `useOnClickOutside`

Detects clicks outside of the `ref` element and calls the provided callback.

```tsx
import { useOnClickOutside } from '@talismn/ui';

const Popup = ({ handleClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, handleClose);
  return <div ref={ref}>/* content */</div>;
};
```

## Utils

### `truncateMiddle`

Truncates the input string and replace with dots.

```tsx
import { truncateMiddle } from '@talismn/ui';

truncateMiddle('5FNfznCsgDKywfDXsYTf7YydpnMHUr8fjabK48rS2oFUugdc'); // 5FNf...ugdc
```

## Running unit tests

Run `nx test talisman-connect-ui` to execute the unit tests via [Jest](https://jestjs.io).
