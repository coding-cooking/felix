import type { Metadata } from "next";
import CardList from "@/components/CardList";
import { fetchArticles } from "./lib/actions";
import Subscription from "@/components/Subscription";

export const metadata: Metadata = {
  title: "Fei Zhang | Felix | Software | Blog | Web Development | felix-one.vercel.app",
  description: "My name is Felix, I'm a software engineer based in Sydney, I'd love to provide high standard services regarding web development on both the frontend and backend. My email can be accessed on my blog website: felix-one.vercel.app.",
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
      <CardList articles={articles} q={q} />
      <Subscription />
    </>
  );
}
