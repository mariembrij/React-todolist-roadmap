import { useState, useEffect } from 'react'

// Like useState, but it also reads its initial value from localStorage
// and writes back every time the value changes.
export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key)
        return stored !== null ? JSON.parse(stored) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}