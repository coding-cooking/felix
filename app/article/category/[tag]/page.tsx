"use client"

import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext"
import { useLangContext } from "@/app/context/LangContext"
import CardList from "@/components/CardList"
import { useContext } from "react"
import Container from "@mui/material/Container"
import { tagMap } from "@/components/ArticleTag"

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
    const initialPage = searchParams?.page || "1";

    const articlesWithTag = articles.filter(article => {
        const transformedTag = Object.keys(tagMap).find(key => tagMap[key].toLowerCase() === params.tag.toLowerCase());
        let processedtags = lang === "EN" ? article.englishTags.map(tag => tag.toLowerCase()) : article.chineseTags.map(tag => tag);
        return lang === "EN" ? processedtags.includes(params.tag.toLowerCase()) : processedtags.includes(decodeURIComponent(transformedTag));
    });
    return (
        <Container sx={{ paddingTop: "2em" }}>
            <CardList articles={articlesWithTag} initialPage={initialPage} />
        </Container>
    )
}