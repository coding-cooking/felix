import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			bufferCommands: false,
			serverSelectionTimeoutMS: 10000, // Set a higher value here
		});
	} catch (err) {
		console.error(err);
	}
};
