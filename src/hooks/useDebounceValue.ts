import { useEffect, useState } from 'react';
import { debounce } from 'utils';
import useMounted from './useMounted';

function useDebounceValue<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  const mountedRef = useMounted();

  useEffect(() => {
    debounce(() => {
      if (mountedRef.current) {
        setDebounceValue(value);
      }
    }, delay);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounceValue;
