import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import { connectDB } from "@/config/dbConnect";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    
    if (!params?.id)
        return NextResponse.json({ message: 'ID parameter is required!' }, { status: 404 });
    const article = await Article.findOne({ _id: params.id }).exec();
    console.log("article is ", article)
    if (!article)
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    return NextResponse.json(article, { status: 201 });

}