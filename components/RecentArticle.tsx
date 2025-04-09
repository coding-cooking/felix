import ArticleContext, { ArticleInterface } from "@/context/ArticleContext";
import LinkToArticle from "./LinkToArticle";
import { useContext } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    padding: 20px 0;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;


type RecentArticleProps = {
    handle: string
}

export default function RecentArticle({ handle }: RecentArticleProps) {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    const sortedArticles = articles?.filter(article => article.handle !== handle).sort((a, b) => {
        const dateA = new Date(a.publishedDate);
        const dateB = new Date(b.publishedDate);
        return dateB.getTime() - dateA.getTime();
    })

    return (
        <Container>
            <LinkToArticle article={sortedArticles?.[0]} />
            <LinkToArticle article={sortedArticles?.[1]} />
        </Container>
    )
}