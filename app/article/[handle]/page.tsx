import { notFound } from "next/navigation";
import { ArticleInterface } from "../../../context/ArticleContext";
import { Metadata } from 'next';
import { Article } from '@/components/Article';

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const handle = params.handle;
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${handle}`, { cache: 'force-cache' });
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${handle}`;
  const article: ArticleInterface = await data.json();
  const shareDescription = article.content?.find(con => con.type === 'paragraph')?.englishContent?.slice(0, 150) + '...';
  const shareImageUrl = article.bannerImageUrl || 'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg';

  return {
    title: article.englishTitle,
    description: shareDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      title: article.englishTitle,
      description: shareDescription,
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: article.englishTitle,
        }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@felixzhang',
      title: article.englishTitle,
      description: shareDescription,
      images: [{ url: shareImageUrl }],
    },
  }
}

export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams() {
  const articles: ArticleInterface[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`)
    .then((res) => res.json())
    .catch((err) => {
      console.error('Error fetching articles:', err);
      return [];
    });

  if (!articles || articles.length === 0) {
    return [];
  }

  return articles.map((article) => ({
    handle: article.handle,
  }))
}

export default async function ArticlePage({ params }: { params: { handle: string } }) {

  const { handle } = params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${handle}`);

    if (!response.ok) {
      return notFound();
    }

    const article: ArticleInterface = await response.json();

    if (!article) return notFound();

    return (
      <Article article={article} handle={handle} />
    );
  } catch (err) {
    console.error("Error fetching article:", err);
    return notFound();
  }
}

