"use client"

import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext } from "react";
import styled from "@emotion/styled";
import { useLangContext } from "@/app/context/LangContext";

const StyledBox = styled(Box)`
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
    id: string
}

export const RecentArticles = ({ id }: RecentArticlesProps) => {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const sortedArticles = articles?.filter(article => article._id !== id).sort((a, b) => {
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
                    <Box key={`${article._id}-${article.englishTitle}`}>
                        <StyledLink href={`/article/${article._id}`}>
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