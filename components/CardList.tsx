"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import PaginationCard from "./PaginationCard";
import { CardImage } from "./CardImage";
import { ShareButtons } from "./ShareButtons";
import styled from "@emotion/styled";
import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";

const StyledBoxContainer = styled(Box)`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
      grid-template-columns: auto auto;
  }
  @media screen and (min-width: 1028px) {
      grid-template-columns: auto auto auto;
  }
`;

const PaginationWrapper = styled(Box)`
  @media (max-width: 768px) {
      display: none;
    }
`
const LoadButton = styled(Button) <{ noMoreArticles: boolean }>`
  display: none;
  @media (max-width: 768px) {
        display: ${({ noMoreArticles }) => (noMoreArticles ? 'none' : 'block')};
        margin: 20px auto;
      }
`
type CardListProps = {
  initialPage: string,
};

export default function CardList({ initialPage }: CardListProps) {
  const articles: ArticleInterface[] = useContext(ArticleContext);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [showShareButtons, setShowShareButtons] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(9)
  const shareButtonsTimeout = useRef<NodeJS.Timeout | null>(null);

  function paginate(articles: ArticleInterface[], page: string, pageSize: number) {
    const startIndex = (Number(page) - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;
    const sortedArticles = articles.sort((a: ArticleInterface, b: ArticleInterface) => Number(b.publishedDate) - Number(a.publishedDate));
    return sortedArticles.slice(startIndex, endIndex + 1);
  }

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

  const loadMore = () => {
    setPageSize(prev => prev + 9);
  }

  const noMoreArticles = pageSize >= articles.length;

  return (
    <Container maxWidth="xl">
      <StyledBoxContainer>
        {paginate(articles, initialPage, pageSize).map((article, index) => {
          return (
            <Card key={`${article.title}-${index}`} sx={{ maxWidth: 345 }}>
              <Link href={`/article/${article._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <CardActionArea>
                  <CardImage article={article} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" height={80}>
                      {article.content[0]?.content?.slice(0, 60)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
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
                <Link href={`/article/${article._id}`}>
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </StyledBoxContainer>
      <PaginationWrapper>
        <PaginationCard page={initialPage} />
      </PaginationWrapper>
      <LoadButton variant="contained" onClick={loadMore} noMoreArticles={noMoreArticles}>Load More</LoadButton>
    </Container>
  );
}
