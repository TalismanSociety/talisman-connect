import { render } from '@testing-library/react';

import WalletConnectButton from './WalletConnectButton';

describe('WalletConnectButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WalletConnectButton />);
    expect(baseElement).toBeTruthy();
  });
});
