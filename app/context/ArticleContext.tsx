"use client"

import { createContext } from "react";

type ContentBlock = {
    type: string;
    chineseContent: string;
    englishContent: string;
    imageUrl?: string;
    englishCaption?: string;
    chineseCaption?: string;
}

export type ArticleInterface = {
    _id: string;
    chineseTitle: string;
    englishTitle: string;
    handle: string;
    publishedDate: Date;
    bannerImageUrl: string;
    id: string;
    content: ContentBlock[];
    englishTags: string[];
    chineseTags: string[];
}
const ArticleContext = createContext<ArticleInterface[]>([]);

export default ArticleContext;


