import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the DATABASE_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 30000,
            connectTimeoutMS: 30000,
        };

        try {
            console.log("MONGODB_URI is", MONGODB_URI, "trying to connect");

            cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
                console.log('✅ MongoDB connected successfully');
                return mongoose;
            });
        } catch (error) {
            console.error('❌ MongoDB connection error:', error);
            throw error;
        }
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error('❌ Error awaiting MongoDB connection:', error);
        cached.promise = null; 
        throw error;
    }

    return cached.conn;
}

export default dbConnect;
