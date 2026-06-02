import { useEffect } from 'react'

const DEFAULT_THEME = 'tokyo'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') ?? DEFAULT_THEME

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme)
        }
    }, [])

    return <>{children}</>
}
