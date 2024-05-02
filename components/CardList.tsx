"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PaginationCard from "./PagenationCard";
import { CardImage } from "./CardImage";
import { ShareButtons } from "./ShareButtons";

export type ArticleInterface = {
  title: string,
  date: Date,
  content: string,
  images: Array<string>,
  parsedName?: string,
}

type CardListProps = {
  articles: ArticleInterface[],
  q: string,
  initialPage: string,
};

export default function CardList({ articles, q, initialPage }: CardListProps) {
  const [searchedArticles, setSearchedArticles] = useState<ArticleInterface[]>(articles);
  // const [page, setPage] = useState<number>(initialPage);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const shareButtonsTimeout = useRef<NodeJS.Timeout | null>(null);

  function paginate(articles: ArticleInterface[], page: string, pageSize: number) {
    const startIndex = (Number(page) - 1) * pageSize;
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


  const handleMouseEnter = (index: number) => {
    if (shareButtonsTimeout.current) {
      clearTimeout(shareButtonsTimeout.current);
    }
    setHoveredIndex(index);
    setShowShareButtons(true);
  };

  const handleMouseLeave = () => {
    shareButtonsTimeout.current = setTimeout(() => {
      setHoveredIndex(-1);
      setShowShareButtons(false);
    }, 400);
  };

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
        {paginate(searchedArticles, initialPage, 9).map((article, index) => {
          return (
            <Card key={`${article.title}-${index}`} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardImage article={article} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" height={80}>
                    {`${article.content.slice(0, 70)}...`}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ position: "relative", paddingTop: "10px" }}>
                <Button
                  size="small"
                  color="primary"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}>
                  Share
                </Button>
                {showShareButtons && hoveredIndex === index &&
                  <ShareButtons
                    article={article}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    show={showShareButtons && hoveredIndex === index}
                  />}
                <Link href={`/${article.parsedName}`}>
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <PaginationCard searchedArticles={searchedArticles} page={initialPage}/>
    </Container>
  );
}
