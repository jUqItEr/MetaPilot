import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import '/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'


const MyApp = ({ Component, pageProps }) => {
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
            <ThemeProvider enableSystem={false}>
                <Component { ...pageProps } />
            </ThemeProvider>
        </>
    )
}

export default MyApp