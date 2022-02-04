import { act, renderHook } from '@testing-library/react-hooks';
import useWalletConnect from './useWalletConnect';

describe('useWalletConnect', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useWalletConnect());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
