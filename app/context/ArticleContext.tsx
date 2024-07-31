"use client"

import { createContext } from "react";

type ContentBlock = {
    type: string;
    content?: string;
    imageUrl?: string;
    caption?: string;
}

export type ArticleInterface = {
    _id: string;
    title: string;
    publishedDate: Date;
    bannerImageUrl: string;
    id: string;
    content: ContentBlock[];
    tags: string;
}
const ArticleContext = createContext<ArticleInterface[]>([]);

export default ArticleContext;


