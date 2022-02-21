import { render } from '@testing-library/react';

import NftImage from './NftImage';

describe('NftImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftImage />);
    expect(baseElement).toBeTruthy();
  });
});
