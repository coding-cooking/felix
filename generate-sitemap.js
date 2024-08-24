const fs = require("fs");

const generateSitemap = async () => {
  const baseUrl = "https://felix-one.vercel.app";
	const res = await fetch(`${baseUrl}/api/articles`, {
		cache: "force-cache",
	});
	const articles = await res.json();

	const staticRoutes = ["", "/article"];

	let sitemapEntries = staticRoutes.map((route) => {
		return `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
	});

	sitemapEntries = sitemapEntries.concat(
		articles.map((article) => {
			return `
      <url>
        <loc>${baseUrl}/articles/${article.handle}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
		})
	);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries.join("")}
    </urlset>`;

	fs.writeFileSync("public/sitemap.xml", sitemap);
};

generateSitemap();
