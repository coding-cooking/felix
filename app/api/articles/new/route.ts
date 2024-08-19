import Article from "../../../../model/Article";
import connectDB from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { chineseTitle, englishTitle, bannerImageUrl, content, englishTags, chineseTags } = await req.json();

    if (!chineseTitle || !englishTitle || !bannerImageUrl || !content || !englishTags || !chineseTags) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
    }
    try {
        await connectDB();

        const newArticle = await Article.create({
            chineseTitle,
            englishTitle,
            bannerImageUrl,
            content,
            englishTags,
            chineseTags
        });
        return new Response(JSON.stringify(newArticle), {
            status: 201,
        });
        // return res.status(201).json(newArticle);
    } catch (err) {
        return NextResponse.json({ error: 'An error occurred while creating the article.' }, { status: 500 })
    }
}