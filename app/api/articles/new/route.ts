import Article from "../../../../model/Article";
import { connectDB } from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { title, bannerImageUrl,content, tags } = await req.json();

    if (!title || !bannerImageUrl || !content || !tags) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
    }
    try {
        await connectDB();

        const newArticle = await Article.create({
            title,
            bannerImageUrl,
            content,
            tags
        });
        return new Response(JSON.stringify(newArticle), {
            status: 201,
        });
        // return res.status(201).json(newArticle);
    } catch (err) {
        return NextResponse.json({ error: 'An error occurred while creating the article.' }, { status: 500 })
    }
}