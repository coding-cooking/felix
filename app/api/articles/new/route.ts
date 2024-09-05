import Article from "../../../../model/Article";
import connectDB from "@/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { chineseTitle, englishTitle, handle, bannerImageUrl, content, englishTags, chineseTags } = await req.json();

    const secret = req.headers.get('x-article-secret');

    if (secret !== process.env.NEXT_PUBLIC_ARTICLE_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!chineseTitle || !englishTitle || !handle || !bannerImageUrl || !content || englishTags.length === 0 || chineseTags.length === 0) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
    }
    try {
        await connectDB();

        const newArticle = await Article.create({
            chineseTitle,
            englishTitle,
            handle,
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