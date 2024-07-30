import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { connectDB } from "../config/dbConnect";
import Article from "../model/Article";

const migrateMakedownFiles = async () => {
	try {
		await connectDB();
		const contentDir = path.join(process.cwd(), "md");
		const files = await fs.readdir(contentDir);

		for (const file of files) {
			try {
				const filePath = path.join(contentDir, file);
				const fileContents = await fs.readFile(filePath, "utf-8");
				const { data, content } = matter(fileContents);

				const article = {
					title: data.title,
					publishedDate: data.date,
					bannerImageUrl: data.images?.[0] || null,
					content: [
						{
							type: "paragraph",
							paragraph: content,
						},
					],
					tags: data.tags || [],
				};

				await Article.create(article);
				console.log(`Migrated: ${file}`);
			} catch (fileError) {
				console.error(`Error processing file ${file}:`, fileError);
			}
		}

		console.log("Migration completed successfully");
	} catch (err) {
		console.error("Error during migration:", err);
	}
};

migrateMakedownFiles();
