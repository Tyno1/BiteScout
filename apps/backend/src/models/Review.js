import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		restaurantId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "RestaurantData",
			required: true,
		},
		foodCatalogueId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "FoodCatalogue",
			required: false,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
			validate: {
				validator: (value) =>
					Number.isInteger(value) && value >= 1 && value <= 5,
				message: "Rating must be an integer between 1 and 5",
			},
		},
		comment: {
			type: String,
			required: true,
			trim: true,
			maxlength: 1000,
		},
	},
	{ timestamps: true },
);

// Compound index to prevent duplicate reviews from same user for same item
reviewSchema.index(
	{ userId: 1, restaurantId: 1, foodCatalogueId: 1 },
	{ unique: true, sparse: true },
);

// Index for restaurant reviews
reviewSchema.index({ restaurantId: 1, createdAt: -1 });

// Index for food catalogue reviews
reviewSchema.index({ foodCatalogueId: 1, createdAt: -1 });

// Index for user reviews
reviewSchema.index({ userId: 1, createdAt: -1 });

// Index for rating-based queries
reviewSchema.index({ rating: 1, createdAt: -1 });

// Virtual for getting review type
reviewSchema.virtual("reviewType").get(function () {
	return this.foodCatalogueId ? "dish" : "restaurant";
});

// Ensure virtuals are serialized
reviewSchema.set("toJSON", { virtuals: true });
reviewSchema.set("toObject", { virtuals: true });

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
