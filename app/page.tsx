import NavCategory from "@/components/NavCategory";
import { useState } from "react";
import { CategoryType } from "@/type";
import CardList from "@/components/CardList";
import { fetchArticles } from "./action/page";

export default async function Homepage() {
  // const [activeCategory, setActiveCategory] = useState<CategoryType>(
  //   CategoryType.Newest
  // );
  const articles = await fetchArticles();
  return (
    <>
      {/* <NavCategory
        category={activeCategory}
        setActiveCategory={setActiveCategory}
      /> */}
      <CardList articles={articles}/>
    </>
  );
}
