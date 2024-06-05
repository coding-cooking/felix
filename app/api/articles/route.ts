import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

const contentDir = path.join(process.cwd(), "/md");

export async function GET(request: Request) {
    const files = fs.readdirSync(contentDir);
    const articles = files.map(file => {
        const filePath = path.join(contentDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContents);
        const title = data.title;
        const date = data.date;
        const images = data.images;
        const baseName = path.basename(file);
        const parsedName = path.parse(baseName).name;
        console.log('title', title);
        return {
            title,
            date,
            content,
            images,
            parsedName,
        };
    });
    return NextResponse.json(articles, { status: 200 })
}