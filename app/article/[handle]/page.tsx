import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleInterface } from "../../../context/ArticleContext";
import { Metadata } from 'next';
import { RecentArticles } from '@/components/RecentArticles';
import { ArticleContent } from '@/components/ArticleContent';
import { ArticleTitle } from '@/components/ArticleTitle';
import { ArticleTag } from '@/components/ArticleTag';
import { cache } from 'react';
require("dotenv").config();

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const handle = params.handle;
  const data = await fetch(`${process.env.BASE_URL}/api/articles/${handle}`, { cache: 'force-cache' });
  const canonicalUrl = `${process.env.BASE_URL}/article/${handle}`;
  const article: ArticleInterface = await data.json();
  const shareDescription = article.content?.find(con => con.type === 'paragraph')?.englishContent?.slice(0, 150) + '...';
  const shareImageUrl = article.bannerImageUrl || 'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg';

  return {
    title: article.englishTitle,
    description: shareDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: article.englishTitle,
      description: shareDescription,
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: article.englishTitle,
        }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@felixzhang',
      title: article.englishTitle,
      description: shareDescription,
      images: [{ url: shareImageUrl }],
    },
  }
}

export async function generateStaticParams() {
  const articles: ArticleInterface[] = await fetch(`${process.env.BASE_URL}/api/articles`).then((res) => res.json())
  return articles.map((post) => ({
    handle: post.handle,
  }))
}

export default async function Article({ params }: { params: { handle: string } }) {
  "use server";
  const { handle } = params;
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/articles/${handle}`, { cache: 'force-cache' });
    if (!response.ok) {
      return notFound();
    }
    const article: ArticleInterface = await response.json();
    if (!article) return notFound();

    const articleDate = new Date(article.publishedDate);

    return (
      <Stack>
        <ArticleImage article={article} />
        <Container maxWidth="lg" sx={{
          width: "100%",
          display: "flex",
          gap: "60px",
        }}>
          <Box
            sx={{
              mb: 4,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              flex: 3,
            }}
          >
            <Typography variant="h4" lineHeight={2} gutterBottom sx={{ "@media (max-width: 768px)": { fontSize: "24px", fontWeight: "400" } }}>
              <ArticleTitle article={article} />
            </Typography>
            <Typography variant="subtitle1" lineHeight={3} gutterBottom sx={{ color: "rgba(106, 101, 104, 1)", "@media (max-width: 768px)": { fontSize: "14px" } }}>
              {articleDate.toLocaleDateString()}
            </Typography>
            <Box>
              <Typography variant="body1" lineHeight={2} gutterBottom>
                <ArticleTag article={article} />
              </Typography>
              <ArticleContent article={article} />
            </Box>
          </Box>
          <Box sx={{ flex: 1, "@media (max-width: 768px)": { display: "none" } }}>
            <RecentArticles handle={handle} />
          </Box>
        </Container>
      </Stack>
    );
  } catch (err) {
    console.error("Error fetching article:", err);
    return notFound();
  }
}

