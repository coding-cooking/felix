import mongoose from "mongoose";

export const connectDB = async () => {
	if (mongoose.connections[0].readyState) {
		console.log("Already connected to MongoDB");
		return;
	}

	try {
		await mongoose.connect(process.env.DATABASE_URI);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
};
