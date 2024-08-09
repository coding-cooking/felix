import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleInterface } from "../../context/ArticleContext";
import { Metadata } from 'next';
import { RecentArticles } from '@/components/RecentArticles';
import { ArticleContent } from '@/components/ArticleContent';
require("dotenv").config();


type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const data = await fetch(`${process.env.BASE_URL}/api/articles/${id}`);
  const article: ArticleInterface = await data.json();
  const shareDescription = article.content.find(con => con.type === 'paragraph')?.content?.slice(0, 150) + '...';
  const shareImageUrl = article.bannerImageUrl || 'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg';

  return {
    title: article.title,
    description: shareDescription,
    openGraph: {
      type: 'article',
      title: article.title,
      description: shareDescription,
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@felixzhang',
      title: article.title,
      description: shareDescription,
      images: [{ url: shareImageUrl }],
    },
  }
}

export default async function Article({ params }: { params: { id: string } }) {
  "use server";
  const { id } = params;
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/articles/${id}`);
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
              {article.title}
            </Typography>
            <Typography variant="subtitle1" lineHeight={3} gutterBottom sx={{ color: "rgba(106, 101, 104, 1)", "@media (max-width: 768px)": { fontSize: "14px" } }}>
              {articleDate.toLocaleDateString()}
            </Typography>
            <Box>
              <Typography variant="body1" lineHeight={2} gutterBottom>
                Tags: 
                {article.tags.map((tag, index) => {
                  return <span key={index} style={{ color: "rgba(252,252,252,1)", backgroundColor: "rgba(38, 49, 110, .7)", margin: "4px", padding: "2px", borderRadius: "4px", cursor: "pointer" }}> {tag}</span>
                })}
              </Typography>
              <ArticleContent article={article} />
            </Box>
          </Box>
          <Box sx={{ flex: 1, "@media (max-width: 768px)": { display: "none" } }}>
            <RecentArticles id={id}/>
          </Box>
        </Container>
      </Stack>
    );

  } catch (err) {
    console.error("Error fetching article:", err);
    return notFound();
  }

}
