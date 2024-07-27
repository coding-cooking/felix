import { Schema } from "mongoose";

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

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	publishedDate: {
		type: Date,
		required: true,
	},
	content: [contentBlockSchema],
	tags: [String]
});

const Article = mongoose.model("Article", articleSchema);