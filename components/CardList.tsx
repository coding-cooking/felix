"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export type ArticleInterface = {
  title: string,
  date: string,
  content: string,
  images: Array<string>,
  parsedName?: string,
}

type CardListProps = {
  articles: ArticleInterface[],
  q: string,
};

export default function CardList({ articles, q }: CardListProps) {
  const [searchedArticles, setSearchedArticles] = useState<ArticleInterface[]>(articles);
  useEffect(() => {
    const _articles = q
      ? articles.filter(
        (article: ArticleInterface) =>
          article.title.toLowerCase().includes(q.toLowerCase()) || article.content.toLowerCase().includes(q.toLowerCase())
      )
      : articles;
    setSearchedArticles(_articles);
  }, [q, articles])

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          gap: 4,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        {searchedArticles?.sort((a: ArticleInterface, b: ArticleInterface) => Number(b.parsedName) - Number(a.parsedName))
          .map((article: ArticleInterface) => {
            return (
              <Card key={article.title} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.images[0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" height={80}>
                      {`${article.content.slice(0, 70)}...`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Link href={`/${article.parsedName}`}><Button size="small">Learn More</Button></Link>
                </CardActions>
              </Card>
            );
          })}
      </Box>
      {/* <Box
        sx={{
          my: 14,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Pagination count={10} variant="outlined" color="primary" />
      </Box> */}
    </Container>
  );
}
