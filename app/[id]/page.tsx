import { fetchArticleById } from "@/app/lib/actions";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { ArticleImage } from "@/components/ArticleImage";
import { ArticleInterface } from "@/components/CardList";
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id
  const article: ArticleInterface = await fetchArticleById(id);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  return {
    title: article.title,
    openGraph: {
      type: 'website',
      title: article.title,
      description: article.content.slice(0, 70) + '...',
      images: [{ url: article.images[0] }],
      url: `https://felix-one.vercel.app/${article.parsedName}`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@felixzhang',
      title: article.title,
      description: article.content.slice(0, 70) + '...',
      images: [{ url: article.images[0] }],
    },
  }
}

export default async function Article({ params }: { params: { id: string } }) {
  "use server";
  const { id } = params;
  const article: ArticleInterface = await fetchArticleById(id);
  if (!article) return notFound();

  return (
    <Stack>
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
          <Typography variant="h4" lineHeight={2} gutterBottom sx={{ '@media (max-width: 768px)': { fontSize: "24px", fontWeight: "400" } }}>
            {article.title}
          </Typography>
          <Typography variant="subtitle1" lineHeight={3} gutterBottom sx={{ '@media (max-width: 768px)': { fontSize: "14px" } }}>
            {article.date.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" lineHeight={2} gutterBottom>
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </Typography>
        </Box>
      </Container>
    </Stack>
  );
}
