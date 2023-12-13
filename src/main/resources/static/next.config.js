{import('next').NextConfig}

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['i.imgur.com', 'localhost']
    },
    async rewrites() {
        if (process.env.NODE_ENV === 'package') {
            return [
                {
                    source: '/api/:path*',
                    destination: process.env.PACKAGE_JAVA_SERVER_URL + '/api/:path*'
                },
                {
                    source: '/login/:path*',
                    destination: process.env.PACKAGE_JAVA_SERVER_URL + '/login/:path*'
                },
                {
                    source: '/oauth/:path*',
                    destination: process.env.PACKAGE_JAVA_SERVER_URL + '/oauth/:path*'
                }
            ]
        } else {
            return [
                {
                    source: '/api/:path*',
                    destination: process.env.LOCAL_JAVA_SERVER_URL + '/api/:path*'
                },
                {
                    source: '/login/:path*',
                    destination: process.env.LOCAL_JAVA_SERVER_URL + '/login/:path*'
                },
                {
                    source: '/oauth2/:path*',
                    destination: process.env.LOCAL_JAVA_SERVER_URL + '/oauth2/:path*'
                }
            ]
        }
    }
}
module.exports = nextConfig