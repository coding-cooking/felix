import { Schema, models, model } from "mongoose";

const contentBlockSchema = new Schema({
	type: {
		type: String,
		enum: ["paragraph", "image"],
		required: true,
	},
	chineseContent: {
		type: String,
		required: function () {
			return this.type === "paragraph";
		},
	},
	englishContent: {
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
	chineseCaption: {
		type: String,
		required: false,
	},
	englishCaption: {
		type: String,
		required: false,
	},
});

const articleSchema = new Schema({
	chineseTitle: {
		type: String,
		required: true,
	},
	englishTitle: {
		type: String,
		required: true,
	},
	bannerImageUrl: String,
	publishedDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	content: [contentBlockSchema],
	englishTags: [String],
	chineseTags: [String],
});

const Article = models.Article || model("Article", articleSchema);
export default Article;