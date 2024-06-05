"use client"

import { createContext } from "react";


export type ArticleInterface = {
    title: string,
    date: Date,
    content: string,
    images: Array<string>,
    parsedName?: string,
}
const ArticleContext = createContext<ArticleInterface[]>([]);

export default ArticleContext;


