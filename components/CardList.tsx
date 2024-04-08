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
import PaginationCard from "./PagenationCard";

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

  function paginate(articles: ArticleInterface[], page: number, pageSize: number){
    const startIndex = (page -1 ) * pageSize;
    const endIndex = startIndex + pageSize - 1;
    const pageItems = articles.slice(startIndex, endIndex + 1);
    return pageItems;
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
        {paginate(searchedArticles, page, 9)?.sort((a: ArticleInterface, b: ArticleInterface) => Number(b.parsedName) - Number(a.parsedName))
        .map((article) => {
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
      <PaginationCard searchedArticles={searchedArticles} page={page} setPage={setPage}/>
      
    </Container>
  );
}
