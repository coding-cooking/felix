import { Schema, models, model } from "mongoose";

const contentBlockSchema = new Schema({
	type: {
		type: String,
		enum: ["paragraph", "image"],
		required: true,
	},
	content: {
		type: String,
		required: function () {
			return this.type === "paragraph";
		},
	},
	imageUrl: {
		type: String,
		required: function () {
			return this.type === "image";
		},
	},
	caption: {
		type: String,
		required: false,
	},
});

const articleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	publishedDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	content: [contentBlockSchema],
	tags: [String]
});

const Article = models.Article || model("Article", articleSchema);
export default Article;