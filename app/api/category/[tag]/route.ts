import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export async function GET(req: NextRequest, { params }: { params: { tag: string } }) {
    try {
        await dbConnect();
        if (!params?.tag) {
            return NextResponse.json({ message: 'Tag parameter is required!' }, { status: 404 });
        }
        const articles = await Article.find({ tag: params.tag }).lean().exec();
        if (articles.length === 0) {
            return NextResponse.json({ message: "No articles found!" }, { status: 204 });
        }
        return NextResponse.json(articles, { status: 201 });
    } catch (err) {
        console.error('Error fetching articles:', err);
        return NextResponse.json({ message: "Error fetching articles" }, { status: 500 });
    }
}