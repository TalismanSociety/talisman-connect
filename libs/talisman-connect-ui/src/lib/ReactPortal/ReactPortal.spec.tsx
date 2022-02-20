import { render } from '@testing-library/react';

import ReactPortal from './ReactPortal';

describe('ReactPortal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPortal />);
    expect(baseElement).toBeTruthy();
  });
});
