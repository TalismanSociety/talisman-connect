import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue = ''
): [string, (v: string) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);
  useEffect(() => {
    const item =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : false;
    if (item) {
      try {
        setStoredValue(JSON.parse(item));
      } catch (err) {
        setStoredValue(item);
      }
    }
  }, [key, setStoredValue]);

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}
