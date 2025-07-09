import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    associatedWith: {
      type: {
        type: String,
        enum: ["post", "dish"],
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "associatedWith.type",
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
mediaSchema.index({ "associatedWith.type": 1, "associatedWith.id": 1 });
mediaSchema.index({ uploadedBy: 1, createdAt: -1 });
mediaSchema.index({ verified: 1 });
mediaSchema.index({ type: 1 });

// Virtual for getting the referenced model name
mediaSchema.virtual("associatedWith.ref").get(function () {
  return this.associatedWith.type === "post" ? "Post" : "FoodCatalogue";
});

// Ensure virtuals are serialized
mediaSchema.set("toJSON", { virtuals: true });
mediaSchema.set("toObject", { virtuals: true });

export default mongoose.models.Media || mongoose.model("Media", mediaSchema); 