import { fetchArticleById } from "@/app/lib/actions";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';


import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { StyledImage } from "@/components/Image";




export default async function Article({ params }: { params: { id: string } }) {
  "use server";
  const { id } = params;
  const article = await fetchArticleById(id);
  if (!article) return notFound();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h3" lineHeight={2} gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="subtitle1" lineHeight={3} gutterBottom>
          {article.date.toLocaleDateString()}
        </Typography>
        <Typography variant="body1" lineHeight={2} gutterBottom>
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </Typography>
        <Stack direction="row" spacing={2} width="100%">
          {
            article.images.map((_: string, index: number) => <StyledImage key={index} imageUrl={article.images[index]} />)
          }
        </Stack>

      </Box>
    </Container>
  );
}
