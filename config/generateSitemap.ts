const fs = require('fs');
import { ArticleInterface } from "@/context/ArticleContext";

export const generateSitemap = async () => {
    const res = await fetch(`/api/articles`, { cache: 'force-cache' });
    const articles: ArticleInterface[] = await res.json();

    const staticRoutes = ['', '/article'];

    let sitemapEntries = staticRoutes.map(route => {
        return `
      <url>
        <loc>${process.env.BASE_URL}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
    });

    sitemapEntries = sitemapEntries.concat(
        articles.map(article => {
            return `
      <url>
        <loc>${process.env.BASE_URL}/articles/${article.handle}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
        })
    )

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries.join('')}
    </urlset>`;

    fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
