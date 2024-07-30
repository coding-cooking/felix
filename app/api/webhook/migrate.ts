import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConnect";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Article from "@/model/Article";

type MdArticle = {
    title: string;
    date: Date;
    images: string[];
    tags: string[];
    content: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectDB();
        const contentDir = path.join(process.cwd(), "md");
        const files = await fs.readdir(contentDir);

        const migratedArticles: MdArticle[] = [];

        for (const file of files) {
            try {
                const filePath = path.join(contentDir, file);
                const fileContents = await fs.readFile(filePath, "utf-8");
                const { data, content } = matter(fileContents);

                const article = {
                    title: data.title,
                    publishedDate: data.date,
                    bannerImageUrl: data.images?.[0] || null,
                    content: [
                        {
                            type: "paragraph",
                            paragraph: content,
                        },
                    ],
                    tags: data.tags || [],
                };

                const newArticle = await Article.create(article);
                migratedArticles.push(newArticle);
                return new Response(JSON.stringify(newArticle), {
                    status: 201,
                });
            } catch (fileError) {
                return NextResponse.json({ error: `Error processing file ${file}:`, fileError }, { status: 500 })
            }
        }

        console.log("Migration completed successfully");
        return new Response(JSON.stringify(migratedArticles), {
            status: 201,
        });
    } catch (err) {
        console.error('Error during migration:', err);
        return NextResponse.json({ error: "Error during migration" }, { status: 500 })
    }
}

