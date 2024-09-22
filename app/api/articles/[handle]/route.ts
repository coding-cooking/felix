import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export const dynamic = 'force-static';

export async function GET(req: NextRequest, { params }: { params: { handle: string } }) {
    await dbConnect();
    if (!params?.handle) {
        return NextResponse.json({ message: 'Handle parameter is required!' }, { status: 404 });
    }
    const article = await Article.findOne({ handle: params.handle }).exec();
    if (!article) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 201 });
}