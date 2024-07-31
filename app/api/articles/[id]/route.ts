import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import { NextApiRequest } from "next";

const contentDir = path.join(process.cwd(), "/md");
const files = fs.readdirSync(contentDir);

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    // const file = files.find((file) => {
    //     const baseName = path.basename(file);
    //     const parsedName = path.parse(baseName);
    //     return parsedName.name === params.id;
    // });
    // console.log(file);
    // if (file) {
    //     const filePath = path.join(contentDir, file);
    //     const fileContents = fs.readFileSync(filePath, "utf-8");
    //     const { data, content } = matter(fileContents);
    //     const title = data.title;
    //     const date = data.date;
    //     const images = data.images;
    //     return NextResponse.json({ title, date, content, images });
    // }
    if (!params?.id)
        return NextResponse.json({ message: 'ID parameter is required!' }, { status: 404 });
    const article = await Article.findOne({ _id: params.id }).exec();
    console.log("article is ", article)
    if (!article)
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(article, { status: 201 });

}