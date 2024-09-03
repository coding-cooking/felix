"use client"
import ArticleForm from "@/components/ArticleForm"

export default function CreateArticle() {
    return (
        <ArticleForm submitUrl="/api/articles/new"/>
    )
}