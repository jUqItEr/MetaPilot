import { useRouter } from 'next/router'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        typeof document !== undefined
            ? require('bootstrap/dist/js/bootstrap')
            : null
    }, [router.events])

    return (
        <>
            <Component { ...pageProps } />
        </>
    )
}