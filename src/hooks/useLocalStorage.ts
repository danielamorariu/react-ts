import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
// Get the value from local storage or the initial value we parse it
    const [value, setValue] = useState<T>(() => {
        // get items from local storage
        const jsonValue = localStorage.getItem(key)
        // if we have something in local storage we return it
        if (jsonValue != null) return JSON.parse(jsonValue)

        // is this default value a function
        if (typeof initialValue === "function") {
          return (initialValue as () => T)()
        } else {
          return initialValue
        }
    })

  // whenever any of the values of key/value change we will update the local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}

export default function useLocalStorageBudgets(key, defaultValue) {
const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
