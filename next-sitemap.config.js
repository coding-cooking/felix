/** @type {import('next-sitemap').IConfig} */
module.exports =  {
	siteUrl: "https://felix-one.vercel.app",
	generateRobotsTxt: true,
	exclude: ["/article/new", "/article/new/*", "/api/*"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: ["/article/new", "/article/new/*", "/api/*"],
			},
		],
	},
};
