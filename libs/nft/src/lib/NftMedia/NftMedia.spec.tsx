import { render } from '@testing-library/react';

import NftMedia from './NftMedia';

describe('NftMedia', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftMedia />);
    expect(baseElement).toBeTruthy();
  });
});
