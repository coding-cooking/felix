"use client"

import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext } from "react";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
`

const StyledTypography = styled(Typography)`
    color: #26316e; 
`

const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`

const StyledAnchor = styled.a`
    font-size: 20;
    font-weight: 400;
    line-height: 2;
    color: #000000;
    
    span {
        display: inline-block;
        text-align: center;
        transition: transform 0.3s ease;
    }

    &:focus {
        background: #bae498;
    }

    &:hover {
        background: #687ded;
    }

    &:hover span {
        transform: translateX(2px) translatey(-2px);
    }
`

type RecentArticlesProps = {
    id: string

}


export const RecentArticles = ({id}: RecentArticlesProps) => {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const sortedArticles = articles?.filter(article => article._id !== id).sort((a, b) => {
        const dateA = new Date(a.publishedDate);
        const dateB = new Date(b.publishedDate);
        return dateB.getTime() - dateA.getTime();
    })
    console.log(articles);

    return (
        <StyledBox>
            <StyledTypography variant="h5" lineHeight={2}>
                Recent Articles
            </StyledTypography>
            {sortedArticles?.map(article => {
                return (
                    <Box key={`${article._id}-${article.title}`}>
                        <StyledLink href={`/article/${article._id}`}>
                            <StyledAnchor>
                                <span>
                                    {article.title}
                                </span>
                            </StyledAnchor>
                        </StyledLink>
                    </Box>
                )
            })}
        </StyledBox>
    )


}