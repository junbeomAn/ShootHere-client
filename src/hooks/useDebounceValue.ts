import { useEffect, useState } from 'react';
import { debounce } from 'utils';

function useDebounceValue<T>(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    debounce(() => setDebounceValue(value), delay);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounceValue;
