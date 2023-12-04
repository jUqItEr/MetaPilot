export default function RootLayout({ children }) {
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