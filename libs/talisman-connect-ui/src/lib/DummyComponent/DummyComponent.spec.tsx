import { render } from '@testing-library/react';

import DummyComponent from './DummyComponent';

describe('DummyComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DummyComponent />);
    expect(baseElement).toBeTruthy();
  });
});
