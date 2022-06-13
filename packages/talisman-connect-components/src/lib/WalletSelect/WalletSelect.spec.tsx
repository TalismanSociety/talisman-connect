import { render } from '@testing-library/react';

import WalletSelect from './WalletSelect';

describe('WalletSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WalletSelect />);
    expect(baseElement).toBeTruthy();
  });
});
