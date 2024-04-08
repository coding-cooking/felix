import type { Metadata } from "next";
import CardList from "@/components/CardList";
import { fetchArticles } from "./lib/actions";
import Subscription from "@/components/Subscription";

export const metadata: Metadata = {
  title: "Felix's Website",
  description: "A record of a new immigrant settled in Sydney.",
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
