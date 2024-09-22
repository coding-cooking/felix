import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export const dynamic = 'force-static';

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { handle: string } }) {
    await dbConnect();
    if (!params?.handle) {
        return NextResponse.json({ message: 'Handle parameter is required!' }, { status: 404 });
    }
    const article = await Article.findOne({ handle: params.handle }).exec();

    // Set cache control headers
    const response = NextResponse.json(article, { status: 200 });
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');

    if (!article) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
}