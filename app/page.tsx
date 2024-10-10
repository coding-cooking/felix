import type { Metadata } from "next";
import Subscription from "@/components/Subscription";
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ArticleList } from "@/components/ArticleList";

export const metadata: Metadata = {
  title: "Felix | Web Development | Product Operations",
  description: "My name is Felix, I'm a software engineer based in Sydney, I'd love to provide high standard services regarding web development on both the frontend and backend. My email can be accessed on my blog website: felix-one.vercel.app.",
  icons: {
    icon: "/logo_light.png"
  },
  openGraph: {
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg',
        width: 1200,
        height: 630,
        alt: "Felix's website",
      },
    ],
    url: 'https://felix-one.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@felixzhang',
    title: "Felix's website",
    description: "My name is Felix, I'm a software engineer based in Sydney, I'd love to provide high standard services regarding web development on both the frontend and backend.My email can be accessed on my blog website: felix - one.vercel.app.",
    images: [
      'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg',
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

type HomepageProps = {
  searchParams: {
    page: string,
  }
}

export default async function Homepage({ searchParams }: HomepageProps) {
  const initialPage = searchParams?.page || "1";

  return (
    <>
      <GoogleTagManager gtmId="GTM-TTVSHND3" />
      <GoogleAnalytics gaId="G-ZH9RXZMLJM" />
      <ArticleList initialPage={initialPage} />
      {/* <CardList initialPage={initialPage} /> */}
      {/* <Subscription /> */}
    </>
  );
}
