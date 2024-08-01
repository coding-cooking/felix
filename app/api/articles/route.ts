import { NextResponse } from "next/server";
import Article from "@/model/Article";

export async function GET() {
    const articles = await Article.find();
    if (!articles) return NextResponse.json("No articles found!", { status: 204 });
    return NextResponse.json([], { status: 200 });
}