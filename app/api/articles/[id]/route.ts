import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

const contentDir = path.join(process.cwd(), "/md");

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const files = fs.readdirSync(contentDir);
    const file = files.find((file) => {
        const baseName = path.basename(file);
        const parsedName = path.parse(baseName);
        return parsedName.name === params.id;
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
}