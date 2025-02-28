import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export const dynamic = 'force-static';

export async function GET(req: NextRequest, {params}: { params: { handle: string } }) {
    try{
        if (!params?.handle) {
            return NextResponse.json({ message: 'Handle parameter is required!' }, { status: 404 });
        }

        await dbConnect();
        console.log('✅ Database connected');

        const article = await Article.findOne({ handle: params.handle }).exec();

        if (!article) {
            return NextResponse.json({ message: 'Not found' }, { status: 404 });
        }

        // Set cache control headers
        const response = NextResponse.json(article, { status: 200 });
        response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');

        return NextResponse.json(article, { status: 200 });

    }catch(error){
        console.error('❌ Database connection error:', error);
        return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }  
}