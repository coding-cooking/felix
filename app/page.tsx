import CardList from "@/components/CardList";
import { fetchArticles } from "./lib/actions";

type HomepageProps = {
  searchParams: {
    q: string,
  }
}

export default async function Homepage({ searchParams }: HomepageProps) {
  // const [activeCategory, setActiveCategory] = useState<CategoryType>(
  //   CategoryType.Newest
  // );
  const q = searchParams?.q;

  const articles = await fetchArticles();
  return (
    <>
      {/* <NavCategory
        category={activeCategory}
        setActiveCategory={setActiveCategory}
      /> */}
      <CardList articles={articles} q={q}/>
    </>
  );
}
