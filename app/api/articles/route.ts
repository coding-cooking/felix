import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import Article from "@/model/Article";

const contentDir = path.join(process.cwd(), "/md");

export async function GET(request: Request) {
    // const files = fs.readdirSync(contentDir);
    // const articles = files.map(file => {
    //     const filePath = path.join(contentDir, file);
    //     const fileContents = fs.readFileSync(filePath, 'utf-8');
    //     const { data, content } = matter(fileContents);
    //     const title = data.title;
    //     const date = data.date;
    //     const images = data.images;
    //     const baseName = path.basename(file);
    //     const parsedName = path.parse(baseName).name;
    //     return {
    //         title,
    //         date,
    //         content,
    //         images,
    //         parsedName,
    //     };
    // });

    const articles = await Article.find();
    if (!articles) return NextResponse.json("No articles found!", {status: 204});
    return NextResponse.json(articles, { status: 200 });
}