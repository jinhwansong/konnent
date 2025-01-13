/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    compiler: {
        reactRemoveProperties: true,
        removeConsole: {
            exclude: ['log','error'],
        },
    },
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'k.kakaocdn.net',
            port: '',
        }, {
            protocol: 'https',
            hostname: 'ssl.pstatic.net',
            port: '',
        }, {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
        }, {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
        }, {
            protocol: 'http',
            hostname: 'localhost',
            port: '3030',
        }],
    },
    webpack: config => {
        // svg설정
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;

    },
};

module.exports = nextConfig
