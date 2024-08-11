"use client"

import { ArticleInterface } from "@/app/context/ArticleContext";
import { useLangContext } from "@/app/context/LangContext";

type ArticleTitleInterface = {
    article: ArticleInterface;
}
export const ArticleTitle = ({ article }: ArticleTitleInterface ) => {
    const { lang } = useLangContext();

    return (
        <>
        {lang === "EN" ? article.englishTitle : article.chineseTitle}
        </>

    )
}