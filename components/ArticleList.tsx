"use client"

import ArticleContext, { ArticleInterface } from "@/app/context/ArticleContext";
import CardList from "./CardList"
import { useContext } from "react";

type ArticleListProps = {
    initialPage: string,
};

export const ArticleList = ({ initialPage }: ArticleListProps) => {
    const articles: ArticleInterface[] = useContext(ArticleContext);
    return (
        <CardList articles={articles} initialPage={initialPage}/>
    )
}