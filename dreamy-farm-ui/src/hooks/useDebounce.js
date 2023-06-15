import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof value === 'string' && value.trim()) setIsLoading(true);
    const handler = setTimeout(() => {
      setDebounceValue(value);
      setIsLoading(false);
    }, delay);

    return () => {
      // make sure debounceValue is updated when value is changed
      if (typeof value === 'string') setDebounceValue('');
      clearTimeout(handler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    isLoading,
    setIsLoading,
    debounceValue,
  };
}

export default useDebounce;
