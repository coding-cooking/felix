"use client";

import NavCategory from "@/components/NavCategory";
import { useState } from "react";
import { CategoryType } from "@/type";
import CardList from "@/components/CardList";

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(
    CategoryType.Newest
  );
  return (
    <>
      <NavCategory
        category={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <CardList type={activeCategory} />
    </>
  );
}
