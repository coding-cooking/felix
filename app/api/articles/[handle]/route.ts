import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export async function GET(req: NextRequest, { params }: { params: { handle: string } }) {
    if (!params?.handle) {
        return NextResponse.json({ message: 'Handle parameter is required!' }, { status: 404 });
    }

    try {
        await dbConnect();

        const article = await Article.findOne({ handle: params.handle }).lean().exec();

        if (!article) {
            return NextResponse.json(
                { message: `Article not found for handle: ${params.handle}` },
                { status: 404 }
            );
        }

        const response = NextResponse.json(article, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60, stale-while-revalidate=30'
            }
        });
        
        return response;

    } catch (error) {
        console.error('❌ Error in article API:', error);
        if (error instanceof Error && error.message.includes('MONGODB_URI')) {
            return NextResponse.json(
                { message: 'Database configuration error', error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error',
                path: `/api/articles/${params.handle}`
            },
            { status: 500 }
        );
    }
}