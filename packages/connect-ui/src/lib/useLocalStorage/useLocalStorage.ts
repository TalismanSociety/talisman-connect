import { useEffect, useState } from 'react'

export function useLocalStorage(
  key: string,
  initialValue = '',
): [string, (v: string) => void] {
  const [storedValue, setStoredValue] = useState(initialValue)

  // load initial value from storage
  useEffect(() => {
    if (typeof window === 'undefined') return

    const item = window.localStorage.getItem(key)
    if (!item) return

    try {
      setStoredValue(JSON.parse(item))
    } catch (err) {
      setStoredValue(item)
    }
  }, [key, setStoredValue])

  const setValue = (value: string) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
