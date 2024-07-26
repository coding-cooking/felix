import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

const contentDir = path.join(process.cwd(), "/md");
const files = fs.readdirSync(contentDir);

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const file = files.find((file) => {
        const baseName = path.basename(file);
        const parsedName = path.parse(baseName);
        return parsedName.name === params.id;
    });
    console.log(file);
    if (file) {
        const filePath = path.join(contentDir, file);
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContents);
        const title = data.title;
        const date = data.date;
        const images = data.images;
        return NextResponse.json({ title, date, content, images });
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
}