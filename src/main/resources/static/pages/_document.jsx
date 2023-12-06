import { Html, Head, Main, NextScript } from 'next/document';


const Document = () => {
    return (
        <Html lang='ko'>
            <Head>
                <link rel='stylesheet' as='style' crossOrigin={true.toString()}
                    href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css' />
                <link rel='shortcut icon' href='/favicon.ico' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document