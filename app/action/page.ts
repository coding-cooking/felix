import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { marked } from "marked";

const contentDir = path.join(process.cwd(), "/md");
const files = fs.readdirSync(contentDir);

export const fetchArticles = async () => {
  if(files){
    const articles = files.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);
      const title = data.title;
      const date = data.date;
      const images = data.images;
      const baseName = path.basename(file);
      const parsedName = path.parse(baseName).name;
      return {
        title,
        date,
        content,
        images,
        parsedName
      };
    });
    return articles;
  }
  return notFound();
}

export const fetchArticleById = async (id: string) => {
  const file = files.find((file) => {
    const baseName = path.basename(file);
    const parsedName = path.parse(baseName);
    return parsedName.name === id;
  });

  if (file) {
    const filePath = path.join(contentDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    const title = data.title;
    const date = data.date;
    const images = data.images;

    return {
      title,
      date,
      content,
      images
    };
  }

  return notFound();
};


