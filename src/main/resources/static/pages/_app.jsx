import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import '/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ThemeProvider } from 'next-themes'

export default function MyApp({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        typeof document !== undefined
            ? require('bootstrap/dist/js/bootstrap')
            : null
    }, [router.events])

    return (
        <>
            <Head>
                <link rel='shortcut icon' href='/favicon.ico' />
            </Head>
            <ThemeProvider>
                <Component { ...pageProps } />
            </ThemeProvider>
        </>
    )
}