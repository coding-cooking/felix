"use client"

import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext } from "react";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
`

const StyledLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`

const StyledAnchor = styled.a`
    font-size: 20;
    font-weight: 500;
    line-height: 2;
    color: #000000;
    
    span {
        display: inline-block;
        transition: transform 0.3s ease;
    }


    &:focus {
        background: #bae498;
    }

    &:hover {
        background: #cdfeaa;
    }

    &:active {
        background: #6900ff;
        color: #cdfeaa;
    }

    &:hover span {
        transform: translateX(2px) translatey(-2px);
    }
`


export const RecentArticles = () => {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const sortedArticles = articles.sort((a, b) => {
        const dateA = new Date(a.publishedDate);
        const dateB = new Date(b.publishedDate);
        return dateB.getTime() - dateA.getTime();
    })
    console.log(articles);

    return (
        <StyledBox>
            <Typography variant="h5" lineHeight={2} sx={{ color: "#26316e", "@media (max-width: 768px)": { fontSize: "24px", fontWeight: "400" } }}>
                Recent Articles
            </Typography>
            {articles?.map(article => {
                return (
                    <Box>
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