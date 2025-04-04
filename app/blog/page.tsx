import { ArticleList } from "@/components/ArticleList";

export default function BlogPage({ searchParams }: { searchParams: { page: string } }) {
    const initialPage = searchParams?.page || "1";
    return (
        <ArticleList initialPage={initialPage} />
    )
}