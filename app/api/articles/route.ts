import { NextResponse } from "next/server";
import Article from "@/model/Article";

export async function GET(request: Request) {
    try {
        const articles = await Article.find({}).lean().exec();
        if (articles.length === 0) return NextResponse.json({ message: "No articles found!" }, { status: 204 });
        return NextResponse.json(articles, { status: 200 });
    } catch (err) {
        console.error('Error fetching articles:', err);
        return NextResponse.json({ message: "Error fetching articles" }, { status: 500 });
    }

}