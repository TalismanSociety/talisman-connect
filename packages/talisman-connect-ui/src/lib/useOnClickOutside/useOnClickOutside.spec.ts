import { act, renderHook } from '@testing-library/react-hooks';
import useOnClickOutside from './useOnClickOutside';

describe('useOnClickOutside', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useOnClickOutside());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
