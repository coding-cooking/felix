"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import PaginationCard from "./PaginationCard";
import { CardImage } from "./CardImage";
import { ShareButtons } from "./ShareButtons";
import styled from "@emotion/styled";
import { ArticleInterface } from "@/context/ArticleContext";
import { useLangContext } from "@/context/LangContext";

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

const StyledCard = styled(Card)`
  max-width: 345px;
  @media (max-width: 768px) {
      max-width: 100%;
    }
`

const StyledTitle = styled(Typography)`
  @media (min-width: 768px) {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      height: 66px;
      line-height: 1.4;
    }
`

const StyledContent = styled(Typography)`
  overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
  height: 60px;
  line-height: 1.4;
`

const PaginationWrapper = styled(Box)`
  @media (max-width: 768px) {
      display: none;
    }
`
const LoadButton = styled(Button) <{ nomorearticles: boolean }>`
  display: none;
  @media (max-width: 768px) {
        display: ${({ nomorearticles }) => (nomorearticles ? 'none' : 'block')};
        margin: 20px auto;
      }
`
type CardListProps = {
  articles: ArticleInterface[],
  initialPage: string,
};

export default function CardList({ articles, initialPage }: CardListProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [showShareButtons, setShowShareButtons] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(9)
  const shareButtonsTimeout = useRef<NodeJS.Timeout | null>(null);
  const { lang } = useLangContext();

  console.log('articles are', articles.length)

  function paginate(articles: ArticleInterface[], page: string, pageSize: number) {
    const startIndex = (Number(page) - 1) * pageSize;
    const endIndex = startIndex + pageSize - 1;
    const sortedArticles = articles.sort((a: ArticleInterface, b: ArticleInterface) => {
      const dateA = new Date(a.publishedDate);
      const dateB = new Date(b.publishedDate);
      return dateB.getTime() - dateA.getTime();
    });
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

  const nomorearticles = pageSize >= articles.length;

  return (
    <Container maxWidth="xl">
      <StyledBoxContainer>
        {paginate(articles, initialPage, pageSize).map((article, index) => {
          return (
            <StyledCard key={`${article.englishTitle}-${index}`}>
              <Link href={`/article/${article.handle}`} style={{ textDecoration: 'none', color: 'black' }}>
                <CardActionArea>
                  <CardImage article={article} />
                  <CardContent>
                    <StyledTitle gutterBottom variant="h5">
                      {lang === "EN" ? article.englishTitle : article.chineseTitle}
                    </StyledTitle>
                    <StyledContent variant="body2" color="text.secondary" height={80}>
                      {lang === "EN" ? article.content[0]?.englishContent : article.content[0]?.chineseContent}
                    </StyledContent>
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
                <Link href={`/article/${article.handle}`}>
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </StyledCard>
          );
        })}
      </StyledBoxContainer>
      <PaginationWrapper>
        <PaginationCard page={initialPage} articles={articles} />
      </PaginationWrapper>
      <LoadButton variant="contained" onClick={loadMore} nomorearticles={nomorearticles}>Load More</LoadButton>
    </Container>
  );
}
