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
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
        }],
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};

module.exports = nextConfig
