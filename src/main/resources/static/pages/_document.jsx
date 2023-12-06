import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const setThemeMode = () => {
        const theme = localStorage.getItem('theme')
        return theme ? theme : 'light'
    }

    return (
    <Html lang='ko'>
        <Head>
            <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
            <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
    )
}