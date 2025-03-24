import { notFound } from "next/navigation";
import { ArticleInterface } from "../../../context/ArticleContext";
import { ContentBlock } from "../../../context/ArticleContext";
import { Metadata } from 'next';
import { Article } from '@/components/Article';
import { headers } from 'next/headers';

type Props = {
  params: { handle: string }
}

async function getBaseUrl() {
  try {
    const headersList = headers();
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = headersList.get('host') || process.env.NEXT_PUBLIC_BASE_URL?.replace(/https?:\/\//, '') || 'localhost:3000';
    return `${protocol}://${host}`;
  } catch (error) {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }
}

async function getArticle(handle: string) {
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/api/articles/${handle}`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    console.error(" Article fetch failed:", response.status, response.statusText);
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(" Failed to parse article JSON:", error);
    throw new Error('Failed to parse article data');
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getArticle(params.handle);

    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }

    const shareDescription = article.content?.find((con: ContentBlock) => con.type === 'paragraph')?.englishContent?.slice(0, 150) + '...';
    const shareImageUrl = article.bannerImageUrl || 'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg';
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${params.handle}`;

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
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while loading the article.'
    };
  }
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    // During build time, we'll use the environment variable directly
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/articles`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error('Error fetching articles:', response.statusText);
      return [];
    }

    const articles: ArticleInterface[] = await response.json();

    if (!articles || articles.length === 0) {
      return [];
    }

    return articles.map((article) => ({
      handle: article.handle,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ArticlePage({ params }: { params: { handle: string } }) {
  try {
    const article = await getArticle(params.handle);

    if (!article) {
      return notFound();
    }
    return <Article article={article} handle={params.handle} />;
  } catch (error) {
    console.error(" Error in ArticlePage:", error);
    throw error;
  }
}
