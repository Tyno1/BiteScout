import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["image", "video"],
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

const priceSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true,
		min: 0,
	},
	currency: {
		type: String,
		required: true,
		enum: [
			"USD",
			"EUR",
			"GBP",
			"CAD",
			"AUD",
			"JPY",
			"CNY",
			"KRW",
			"MYR",
			"TWD",
			"VND",
			"THB",
			"ZAR",
		],
	},
});

const locationSchema = new mongoose.Schema({
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "RestaurantData",
		required: true,
	},
	coordinates: {
		type: {
			type: String,
			enum: ["Point"],
			default: "Point",
		},
		coordinates: {
			type: [Number], // [longitude, latitude]
			required: true,
		},
	},
});

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		media: {
			type: [mediaSchema],
			required: true,
			validate: {
				validator: (media) => media && media.length > 0,
				message: "At least one media item is required",
			},
		},
		foodName: {
			type: String,
			required: true,
			trim: true,
		},
		foodCatalogueId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "FoodCatalogue",
			required: false,
		},
		foodCatalogue: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "FoodCatalogue",
		},
		price: {
			type: priceSchema,
			required: true,
		},
		location: {
			type: locationSchema,
			required: true,
		},
		cuisine: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CuisineType",
			required: true,
		},
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
			required: true,
		},
		allergens: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Allergen",
			},
		],
		caption: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		tags: {
			type: [String],
			default: [],
		},
		likes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		visibility: {
			type: String,
			enum: ["public", "private", "followers"],
			default: "public",
		},
	},
	{ timestamps: true },
);

// Index for location-based queries
postSchema.index({ "location.coordinates": "2dsphere" });

// Index for user posts
postSchema.index({ userId: 1, createdAt: -1 });

// Index for restaurant posts
postSchema.index({ "location.restaurantId": 1, createdAt: -1 });

// Index for cuisine and course filtering
postSchema.index({ cuisine: 1, course: 1 });

// Index for visibility
postSchema.index({ visibility: 1, createdAt: -1 });

// Index for food catalogue posts
postSchema.index({ foodCatalogueId: 1, createdAt: -1 });

// Virtual for like count
postSchema.virtual("likeCount").get(function () {
	return this.likes.length;
});

// Ensure virtuals are serialized
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
