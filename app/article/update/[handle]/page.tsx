import { ArticleInterface } from "@/context/ArticleContext";
import ArticleForm from "@/components/ArticleForm";

export default async function UpdateArticle({ params }: { params: { handle: string } }) {
    const { handle } = params;
    const response = await fetch(`${process.env.BASE_URL}/api/articles/${handle}`, { cache: 'force-cache' });
    const article: ArticleInterface = await response.json();

    return <ArticleForm initialData={article} submitUrl="/api/articles/update"/>
}