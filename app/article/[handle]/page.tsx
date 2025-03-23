import { notFound } from "next/navigation";
import { ArticleInterface } from "../../../context/ArticleContext";
import { Metadata } from 'next';
import { Article } from '@/components/Article';

type Props = {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const handle = params.handle;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${handle}`, { 
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      };
    }

    const article: ArticleInterface = await response.json();
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${handle}`;
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles/${params.handle}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return notFound();
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const article: ArticleInterface = await response.json();

    if (!article) {
      return notFound();
    }

    return <Article article={article} handle={params.handle} />;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error; // Let Next.js error boundary handle it
  }
}
