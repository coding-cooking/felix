"use client"

import ArticleContext, { ArticleInterface } from "@/context/ArticleContext";
import { useContext } from "react";
import List from "./List";

type ArticleListProps = {
    initialPage: string,
};

export const ArticleList = ({ initialPage }: ArticleListProps) => {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    return (
        <List articles={articles} initialPage={initialPage} />
    )
}