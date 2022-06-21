import { render } from '@testing-library/react';

import WalletSelectButton from './WalletSelectButton';

describe('WalletSelectButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WalletSelectButton />);
    expect(baseElement).toBeTruthy();
  });
});
