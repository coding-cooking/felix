"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import PaginationCard from "./PagenationCard";
import { CardImage } from "./CardImage";
// import { sendGTMEvent } from '@next/third-parties/google'
import { TwitterShareButton } from "react-share";

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
  const [page, setPage] = useState<number>(1);

  function paginate(articles: ArticleInterface[], page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;
    const sortedArticles = articles.sort((a: ArticleInterface, b: ArticleInterface) => Number(b.parsedName) - Number(a.parsedName));
    return sortedArticles.slice(startIndex, endIndex + 1);

  }

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
        {paginate(searchedArticles, page, 9)?.map((article) => {
            return (
              <Card key={article.title} sx={{ width: 345 }}>
                <CardActionArea>
                  <CardImage article={article} />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
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
                  <Link href={`/${article.parsedName}`}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </Box>
      <PaginationCard searchedArticles={searchedArticles} page={page} setPage={setPage} />
    </Container>
  );
}
