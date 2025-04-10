"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";
import PaginationCard from "./PaginationCard";
import { CardImage } from "./CardImage";
import styled from "@emotion/styled";
import { ArticleInterface } from "@/context/ArticleContext";
import { useLangContext } from "@/context/LangContext";
import { useThemeContext } from "@/context/ThemeContext";

const StyledContainer = styled(Container)`
    background-color: ${({ theme }) => theme === 'dark' ? 'var(--dark-bg)' : 'var(--light-bg)'};
    padding: 40px 0;
`

const StyledBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const StyledCard = styled.div`
  max-width: 700px;
  @media (max-width: 768px) {
      max-width: 100%;
    }
`

const StyledTitle = styled(Typography)`
color: ${({ theme }) => theme === 'dark' ? 'var(--white)' : 'var(--black)'};
  @media (min-width: 768px) {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      height: 36px;
      line-height: 1.2;
      color: ${({ theme }) => theme === 'dark' ? 'var(--white)' : 'var(--black)'};
    }
`

const StyledContent = styled(Typography)`
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 50px;
    line-height: 1.2;
    color: ${({ theme }) => theme === 'dark' ? 'var(--white)' : 'var(--black)'};
`

const PaginationWrapper = styled(Box)`
  @media (max-width: 768px) {
    display: none;
    }
`
const LoadButton = styled(Button) < { 'data-nomorearticles': boolean }> `
  display: none;
  @media (max-width: 768px) {
        display: ${({ 'data-nomorearticles': nomorearticles }) => (nomorearticles ? 'none' : 'block')};
        margin: 20px auto;
      }
`
type CardListProps = {
    articles: ArticleInterface[],
    initialPage: string,
};

export default function List({ articles, initialPage }: CardListProps) {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [showShareButtons, setShowShareButtons] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(9)
    const shareButtonsTimeout = useRef<NodeJS.Timeout | null>(null);
    const { lang } = useLangContext();
    const { theme } = useThemeContext();

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
        <StyledContainer maxWidth="xl" theme={theme}>
            <StyledBoxContainer>
                {paginate(articles, initialPage, pageSize).map((article, index) => {
                    return (
                        <StyledCard key={`${article.englishTitle}-${index}`}>
                            <Link href={`/article/${article.handle}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardImage article={article} />
                                    <CardContent>
                                        <StyledTitle gutterBottom variant="h5" theme={theme}>
                                            {lang === "EN" ? article.englishTitle : article.chineseTitle}
                                        </StyledTitle>
                                        <StyledContent variant="body2" color="text.secondary" height={80} theme={theme}>
                                            {lang === "EN" ? article.content[0]?.englishContent : article.content[0]?.chineseContent}
                                        </StyledContent>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                        </StyledCard>
                    );
                })}
            </StyledBoxContainer>
            <PaginationWrapper>
                <PaginationCard page={initialPage} articles={articles} />
            </PaginationWrapper>
            <LoadButton variant="contained" onClick={loadMore} data-nomorearticles={nomorearticles}>Load More</LoadButton>
        </StyledContainer>
    );
}
