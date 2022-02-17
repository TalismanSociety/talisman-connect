import { render } from '@testing-library/react';

import NftAsset from './NftAsset';

describe('NftAsset', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NftAsset />);
    expect(baseElement).toBeTruthy();
  });
});
