import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleInterface } from "../../context/ArticleContext";
import { Metadata } from 'next';
require("dotenv").config();

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const data = await fetch(`${process.env.BASE_URL}/api/articles/${id}`);
  const article: ArticleInterface = await data.json();
  const shareDescription = article.content.slice(0, 150) + '...';
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
    if(!article) return notFound();

    const articleDate = new Date();

    return (
      <Stack>
        {/* <div>{article.title}</div>
        <div>{article.date}</div>
        <div>{article.content}</div> */}
        <ArticleImage article={article} />
        <Container maxWidth="lg" sx={{ width: "100%" }}>
          <Box
            sx={{
              mb: 4,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h4" lineHeight={2} gutterBottom sx={{ "@media (max-width: 768px)": { fontSize: "24px", fontWeight: "400" } }}>
              {article.title}
            </Typography>
            <Typography variant="subtitle1" lineHeight={3} gutterBottom sx={{ color: "rgba(106, 101, 104, 1)", "@media (max-width: 768px)": { fontSize: "14px" } }}>
              {articleDate.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" lineHeight={2} gutterBottom>
              <ReactMarkdown>{article.content[0].content}</ReactMarkdown>
            </Typography>
          </Box>
        </Container>
      </Stack>
    );

  } catch (err) {
    console.error("Error fetching article:", err);
    return notFound();
  }

}
