import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm', () => {
  it('initializes with given values and updates on onFieldChange', () => {
    const { result } = renderHook(() => useForm({ a: '', b: '' }));
    expect(result.current.values).toEqual({ a: '', b: '' });

    act(() => {
      result.current.onFieldChange({ target: { name: 'a', value: 'x' } } as any);
    });
    expect(result.current.values.a).toBe('x');
  });

  it('setValue and reset work', () => {
    const { result } = renderHook(() => useForm({ a: '1', b: '' }));
    act(() => {
      result.current.setValue('b', 'y');
    });
    expect(result.current.values.b).toBe('y');

    act(() => {
      result.current.reset();
    });
    expect(result.current.values).toEqual({ a: '1', b: '' });
  });
});


