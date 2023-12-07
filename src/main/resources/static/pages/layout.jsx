import { useEffect } from 'react'


const RootLayout = ({ children }) => {
    const setInitialColorMode = () => {
        const getInitialColorMode = () => {
            const persistedPreference = localStorage.getItem('theme')
            const hasPersistedPreference = typeof persistedPreference === 'string'

            if (hasPersistedPreference) {
                return persistedPreference
            }
            const preference = window.matchMedia('(prefer-color-scheme: dark)')
            const hasMediaQueryPreference = typeof preference.matches === 'boolean'

            if (hasMediaQueryPreference) {
                return preference.matches ? 'dark' : 'light'
            }
            return 'light'
        }
        const currentColorMode = getInitialColorMode()
        const element = document.body

        element.style.setProperty('--initial-color-mode', currentColorMode)

        if (currentColorMode === 'dark') {
            document.body.setAttribute('data-theme', 'dark')
        }
    }

    useEffect(() => {
        setInitialColorMode()
    })

    return (
        <html lang='ko'>
            <head>
                <link rel='icon' href='/favicon.ico' />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout