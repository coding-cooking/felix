import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URI;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
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
			socketTimeoutMS: 30000, // Increase timeout to 30 seconds
			connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

// const dbConnect = async () => {
// 	try {
// 		await mongoose.connect(MONGODB_URI, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		console.log("Database connected successfully");
// 	} catch (error) {
// 		console.error("Database connection error:", error);
// 		throw error; // Rethrow the error to handle it in the calling function
// 	}
// };

export default dbConnect;
