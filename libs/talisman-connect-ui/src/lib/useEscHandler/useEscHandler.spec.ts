import { act, renderHook } from '@testing-library/react-hooks';
import useEscHandler from './useEscHandler';

describe('useEscHandler', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useEscHandler());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
