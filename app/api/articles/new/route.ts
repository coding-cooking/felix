import Article from "../../../../model/Article";
import { connectDB } from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { title, content, tags } = await req.json();
    console.log(title, content, tags)

    if (!title || !content || !tags) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
    }
    try {
        await connectDB();

        const newArticle = await Article.create({
            title,
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