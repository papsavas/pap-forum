import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [{ hostname: 'static.vecteezy.com' }],
	},
};

export default nextConfig;
