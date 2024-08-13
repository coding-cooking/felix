"use client"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import PaginationCard from "@/components/PaginationCard";
import { CardImage } from "@/components/CardImage";
import { ShareButtons } from "@/components/ShareButtons";
import styled from "@emotion/styled";
import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import { useLangContext } from "@/app/context/LangContext";

const StyledBoxContainer = styled(Box)`
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  justify-content: center;
  margin: 100px 0 30px 0;
  @media screen and (min-width: 768px) {
      grid-template-columns: auto auto;
  }
  @media screen and (min-width: 1028px) {
      grid-template-columns: auto auto auto;
  }
`;

const StyledTitle = styled(Typography)`
  overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
  height: 66px;
  line-height: 1.4;
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
type TagsArticleListProps = {
    searchParams: {
        page: string
    },
    params: {
        tag: string
    }
}

export default function TagsArticleList({ searchParams, params }: TagsArticleListProps) {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const { lang } = useLangContext();
    const articlesWithTag = articles.filter(article => {
        let processedtags = lang === "EN" ? article.englishTags.map(tag => tag.toLowerCase()) : article.chineseTags.map(tag => tag);
        return lang === "EN" ? processedtags.includes(params.tag.toLowerCase()) : processedtags.includes(decodeURIComponent(params.tag));
    });
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [showShareButtons, setShowShareButtons] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(9)
    const shareButtonsTimeout = useRef<NodeJS.Timeout | null>(null);
    const initialPage = searchParams?.page || "1";

    function paginate(articles: ArticleInterface[], page: string, pageSize: number) {
        const startIndex = (Number(page) - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        const sortedArticles = articlesWithTag.sort((a: ArticleInterface, b: ArticleInterface) => {
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

    const nomorearticles = pageSize >= articlesWithTag.length;

    return (
        <Container maxWidth="xl">
            <StyledBoxContainer>
                {paginate(articlesWithTag, initialPage, pageSize).map((article, index) => {
                    return (
                        <Card key={`${article.englishTitle}-${index}`} sx={{ maxWidth: 345 }}>
                            <Link href={`/article/${article._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <CardActionArea>
                                    <CardImage article={article} />
                                    <CardContent>
                                        <StyledTitle gutterBottom variant="h5">
                                            {lang === "EN" ? article.englishTitle : article.chineseTitle}
                                        </StyledTitle>
                                        <StyledContent variant="body2" color="text.secondary" height={80}>
                                            {lang === "EN" ? article.content[0]?.englishContent?.slice(0, 120) : article.content[0]?.chineseContent?.slice(0, 70)}
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
                                <Link href={`/article/${article._id}`}>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    );
                })}
            </StyledBoxContainer>
            <PaginationWrapper>
                <PaginationCard page={initialPage} articles={articlesWithTag} />
            </PaginationWrapper>
            <LoadButton variant="contained" onClick={loadMore} nomorearticles={nomorearticles}>Load More</LoadButton>
        </Container>
    );
}
