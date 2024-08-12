"use client"

import { ArticleInterface } from "@/app/context/ArticleContext";
import { useLangContext } from "@/app/context/LangContext";
import Link from "next/link";

type ArticleTagProps = {
    article: ArticleInterface;
}

export const ArticleTag = ({ article }: ArticleTagProps) => {
    const { lang } = useLangContext();

    return <>
        Tags:
        {lang === "EN" ?
            article.englishTags.map((tag, index) => {
                const lowercaseTag = tag.toLowerCase();
                return <Link href={`/article/category/${lowercaseTag}`} key={`${index}-${tag}`}>
                    <span
                        style={{
                            color: "rgba(252,252,252,1)",
                            backgroundColor: "rgba(38, 49, 110, .7)",
                            padding: "0 2px",
                            margin: "0 4px",
                            lineHeight: 1.5,
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "inline-block"
                        }}>
                        {tag}
                    </span>
                </Link>
            })
            : article.chineseTags.map((tag, index) => {
                const lowercaseTag = tag.toLowerCase();
                return <Link href={`/article/category/${lowercaseTag}`} key={`${index}-${tag}`}>
                    <span
                        style={{
                            color: "rgba(252,252,252,1)",
                            backgroundColor: "rgba(38, 49, 110, .7)",
                            padding: "0 2px",
                            margin: "0 4px",
                            lineHeight: 1.5,
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "inline-block"
                        }}>
                        {tag}
                    </span>
                </Link>
            })
    }
    </>
}