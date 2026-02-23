import { useEffect, useState } from "react"

/**
 * A hook that delays updating a value until a specified time has passed.
 * Useful for search inputs, window resizing, and performance optimization.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds (default: 500)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
