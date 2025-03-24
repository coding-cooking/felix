import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import dbConnect from "@/config/dbConnect";

export async function GET(req: NextRequest, {params}: { params: { handle: string } }) {
    try {
        if (!params?.handle) {
            return NextResponse.json({ message: 'Handle parameter is required!' }, { status: 404 });
        }

        await dbConnect();
        console.log('✅ Database connected for article:', params.handle);

        const article = await Article.findOne({ handle: params.handle }).lean().exec();
        console.log('Article query result:', article ? 'Found' : 'Not found');

        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }

        const response = NextResponse.json(article, { status: 200 });
        response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');
        return response;

    } catch (error) {
        console.error('❌ Error in article API:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        
        // Check if it's a database connection error
        if (error instanceof Error && error.message.includes('MONGODB_URI')) {
            return NextResponse.json(
                { message: 'Database configuration error', error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}