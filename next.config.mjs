/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
		],
	},
	favicon: "/favicon.ico",
};

export default nextConfig;
