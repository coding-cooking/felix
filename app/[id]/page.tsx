import { fetchArticleById } from "@/app/lib/actions";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { ArticleImage } from "@/components/ArticleImage";
import Head from "next/head";
import { ArticleInterface } from "@/components/CardList";

export default async function Article({ params }: { params: { id: string } }) {
  "use server";
  const { id } = params;
  const article: ArticleInterface = await fetchArticleById(id);
  if (!article) return notFound();

  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={`${article.content.slice(0, 70)}...`} />
        {/* <meta property="og:type" content="article" />
        <meta property="og:image" content={article.images[0]} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={`${article.content.slice(0, 70)}...`} />
        <meta property="og:url" content={`https://felix-one.vercel.app/${article.parsedName}`} /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@felixzhang" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={`${article.content.slice(0, 70)}...`} />
        <meta name="twitter:image" content={article.images[0]} />
        <meta name="twitter:url" content={`https://felix-one.vercel.app/${article.parsedName}`} />
      </Head>
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

    </>


  );
}
