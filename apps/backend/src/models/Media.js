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
      enum: ["image", "video", "audio"],
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    associatedWith: {
      type: {
        type: String,
        enum: ["post", "dish", "restaurant"],
        required: false,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        refPath: "associatedWith.type",
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    fileSize: {
      type: Number,
    },
    mimeType: {
      type: String,
    },
    dimensions: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
    providerId: {
      type: String,
      description: "ID of the media in the cloud storage provider (Cloudinary/AWS S3)",
    },
    provider: {
      type: String,
      enum: ["cloudinary", "aws-s3"],
      description: "Cloud storage provider used for this media",
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
  switch (this.associatedWith.type) {
    case "post":
      return "Post";
    case "dish":
      return "FoodCatalogue";
    case "restaurant":
      return "RestaurantData";
    default:
      return null;
  }
});

// Ensure virtuals are serialized
mediaSchema.set("toJSON", { virtuals: true });
mediaSchema.set("toObject", { virtuals: true });

export default mongoose.models.Media || mongoose.model("Media", mediaSchema); 