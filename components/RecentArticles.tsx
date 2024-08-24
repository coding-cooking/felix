"use client"

import ArticleContext, { ArticleInterface } from "@/context/ArticleContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext } from "react";
import styled from "@emotion/styled";
import { useLangContext } from "@/context/LangContext";

const StyledBox = styled(Box)`
    margin-top: 20px;
`

const StyledTypography = styled(Typography)`
    color: rgba(38, 49, 110, 1);
`

const StyledLink = styled(Link)`
    font-size: 16;
    font-weight: 400;
    line-height: 2;
    color: rgba(38, 49, 110, .7);
    cursor: pointer;

    span {
        display: inline-block;
        text-align: start;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: transform 0.3s ease;

    }

    &:focus-visible {
        background: #bae498;
    }

    &:hover span {
        transform: translateX(2px) translatey(-2px);
        text-decoration: underline;
        text-underline-offset: 4px;
    }
`

type RecentArticlesProps = {
    handle: string
}

export const RecentArticles = ({ handle }: RecentArticlesProps) => {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const sortedArticles = articles?.filter(article => article.handle !== handle).sort((a, b) => {
        const dateA = new Date(a.publishedDate);
        const dateB = new Date(b.publishedDate);
        return dateB.getTime() - dateA.getTime();
    })
    const { lang } = useLangContext();

    return (
        <StyledBox>
            <StyledTypography variant="h5" lineHeight={2}>
                {lang === "EN" ? "Recent Articles" : "近期文章"}
            </StyledTypography>
            {sortedArticles?.map(article => {
                return (
                    <Box key={`${article.handle}-${article.englishTitle}`}>
                        <StyledLink href={`/article/${article.handle}`}>
                            <span>
                                {lang === "EN" ? article.englishTitle : article.chineseTitle}
                            </span>
                        </StyledLink>
                    </Box>
                )
            })}
        </StyledBox>
    )


}