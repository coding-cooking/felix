import CardList from "@/components/CardList";
import { fetchArticles } from "./lib/actions";

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
      <CardList articles={articles} />
    </>
  );
}
