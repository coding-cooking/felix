import type { Metadata } from "next";
import CardList from "@/components/CardList";
import { fetchArticles } from "./lib/actions";
import Subscription from "@/components/Subscription";
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "Fei Zhang | Felix | Software | Blog | Web Development | felix-one.vercel.app",
  description: "My name is Felix, I'm a software engineer based in Sydney, I'd love to provide high standard services regarding web development on both the frontend and backend. My email can be accessed on my blog website: felix-one.vercel.app.",
  icons: {
    icon: "/logo_light.png"
  },
  // openGraph: {
  //   type: 'website',
  //   images: [
  //     {
  //       url: 'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'Sydney sea',
  //     },
  //   ],
  //   url: 'https://felix-one.vercel.app',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@felixzhang',
  //   title: "Felix's website",
  //   description: "a website about life, reading and technology",
  //   images: [
  //     'https://images.pexels.com/photos/21300075/pexels-photo-21300075/free-photo-of-sydney-sea.jpeg',
  //   ],
  // },
};

type HomepageProps = {
  searchParams: {
    q: string,
  }
}

export default async function Homepage({ searchParams }: HomepageProps) {
  const q = searchParams?.q;
  const articles = await fetchArticles();

  return (
    <>
      <GoogleTagManager gtmId="GTM-TTVSHND3" />
      <GoogleAnalytics gaId="G-ZH9RXZMLJM" />
      <CardList articles={articles} q={q}/>
      <Subscription />
    </>
  );
}
