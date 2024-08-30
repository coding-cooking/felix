import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, res: NextResponse) => {
    const { chineseTitle, englishTitle, handle, bannerImageUrl, content, englishTags, chineseTags } = await req.json();

    if (!chineseTitle || !englishTitle || !handle || !bannerImageUrl || !content || !englishTags || !chineseTags) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 400 })
    }
    

}