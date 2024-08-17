"use client"

import { ArticleInterface } from "@/app/context/ArticleContext";
import { useLangContext } from "@/app/context/LangContext";
import Link from "next/link";

type ArticleTagProps = {
    article: ArticleInterface;
}

export const tagMap: { [key: string]: string } = {
    "文化": "culture",
    "电影": "movie",
    "悉尼": "Sydney",
    "中国": "China",
    "天气": "weather",
    "互联网": "internet",
    "生活": "life",
    "旅行": "travel",
    "园艺": "gardening",
    "咖啡": "coffee",
    "动物": "animal",
    "健身": "exercise",
    "财经": "finance",
    "英语": "English"
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
            : article.chineseTags.map((tag: keyof typeof tagMap, index) => {
                const transformedTag = tagMap[tag];
                return <Link href={`/article/category/${transformedTag}`} key={`${index}-${tag}`}>
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