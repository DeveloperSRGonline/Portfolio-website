import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'portfolio-dark-mode'

/**
 * useDarkMode — manages dark/light mode for the portfolio.
 * - Reads initial state from localStorage, falls back to OS preference.
 * - Persists choice to localStorage on every toggle.
 * - Adds/removes the `.dark` class on <html> which activates Tailwind's dark: variants.
 */
const useDarkMode = () => {
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored !== null) return stored === 'true'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        const root = document.documentElement
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem(STORAGE_KEY, String(isDark))
    }, [isDark])

    const toggle = useCallback(() => setIsDark(prev => !prev), [])

    return { isDark, toggle }
}

export default useDarkMode
