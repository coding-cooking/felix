import { NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export async function GET(request: Request) {
    try {
        await dbConnect();
        const articles = await Article.find({}).lean().exec();
        
        if (articles.length === 0) {
            return NextResponse.json({ message: "No articles found!" }, { status: 204 });
        }

        const response = NextResponse.json(articles, { status: 200 });
        response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');
        return response;
    } catch (err) {
        console.error('Error fetching articles:', err);
        return NextResponse.json({ message: "Error fetching articles" }, { status: 500 });
    }
}