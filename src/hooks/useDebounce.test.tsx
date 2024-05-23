import { act, renderHook } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce hook', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial'));

    expect(result.current.debouncedValue).toBe('initial');
  });

  it('updates debounced value after timeout', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' }
    });

    expect(result.current.debouncedValue).toBe('initial');

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debouncedValue).toBe('updated');
  });

  it('cancels previous timeout on subsequent updates', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'initial' }
    });

    expect(result.current.debouncedValue).toBe('initial');

    rerender({ value: 'second update' });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedValue).toBe('second update');
  });

  it('uses provided timeout value', async () => {
    const customTimeout = 750;
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, customTimeout), {
      initialProps: { value: 'initial' }
    });

    expect(result.current.debouncedValue).toBe('initial');

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(customTimeout);
    });

    expect(result.current.debouncedValue).toBe('updated');
  });
});
