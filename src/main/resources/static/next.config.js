{import('next').NextConfig}

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    async rewrites() {
        if (process.env.NODE_ENV === 'package') {
            return [
                {
                    source: process.env.PACKAGE_JAVA_SERVER_PATH,
                    destination: process.env.PACKAGE_JAVA_SERVER_URL
                }
            ]
        } else {
            return [
                {
                    source: process.env.LOCAL_JAVA_SERVER_PATH,
                    destination: process.env.LOCAL_JAVA_SERVER_URL
                }
            ]
        }
    }
}
module.exports = nextConfig