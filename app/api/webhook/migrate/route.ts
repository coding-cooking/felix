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

type ContentBlock = {
    type: string;
    content?: string;
    imageUrl?: string;
    caption?: string;
}

type DbArticle = {
    title: string;
    publishedDate: Date;
    bannerImageUrl: string[];
    content: ContentBlock[];
    tags: string[];
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectDB();
        const contentDir = path.join(process.cwd(), "md");
        const files = await fs.readdir(contentDir);

        const migratedArticles: DbArticle[] = [];

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
                            content: content,
                        },
                    ],
                    tags: data.tags || [],
                };

                const existingArticle = await Article.findOne({ title: article.title });

                if (!existingArticle) {
                    const newArticle = await Article.create(article);
                    migratedArticles.push(newArticle);
                } else {
                    console.log(`Article with title "${article.title}" already exists.`);
                }
                
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

