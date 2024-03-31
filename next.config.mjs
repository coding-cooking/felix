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
	distDir: "docs",
	webpack: (config) => {
		config.output.filename = "index.js";
		return config;
	},
};

export default nextConfig;
