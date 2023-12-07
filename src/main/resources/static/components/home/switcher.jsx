import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export const ThemeSwitcher = () => {
    const [ mounted, setMounted ] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className=''>
            <h1>{theme}</h1>
            <button onClick={() => setTheme('light')}>Light!</button>
            <button onClick={() => setTheme('dark')}>Dark!</button>
        </div>
    )
}