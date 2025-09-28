"use client";

import { useState } from "react";

interface reviewProps {
  id: number;
  user: {
    name: string;
    hometown: string;
    disability: string;
  };
  dish: string;
  rating: number;
  reviewText: string;
  media: { type: "image" | "video"; url: string }[];
  date: string;
  resolved: boolean;
  tags: string[];
}
export default function Reviews() {
  const defaultReview = {
    id: 0,
    user: {
      name: "",
      hometown: "",
      disability: "",
    },
    dish: "",
    rating: 0,
    reviewText: "",
    media: [],
    date: "",
    resolved: false,
    tags: [],
  };
  const reviews = [
    {
      id: 1,
      user: {
        name: "Emily Johnson",
        hometown: "Seattle",
        disability: "None",
      },
      dish: "Margherita Pizza",
      rating: 8.5,
      reviewText: "Delicious pizza with fresh ingredients. Loved the crispy crust!",
      media: [
        { type: "image", url: "/placeholder-pizza.jpg" },
        { type: "video", url: "/placeholder-video.mp4" },
      ],
      date: "2024-02-15",
      resolved: false,
      tags: ["Positive", "Food Quality"],
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        hometown: "San Francisco",
        disability: "Visual Impairment",
      },
      dish: "Seafood Paella",
      rating: 7.2,
      reviewText: "Good flavor, but found some shells in the dish. Service was attentive.",
      media: [{ type: "image", url: "/placeholder-paella.jpg" }],
      date: "2024-02-10",
      resolved: true,
      tags: ["Service", "Improvement Needed"],
    },
  ] as reviewProps[];

  const [selectedReview, setSelectedReview] = useState<reviewProps>(defaultReview);

  const handleReviewSelect = (review: reviewProps) => {
    setSelectedReview(review);
  };

  // const renderMediaPreview = (media: Media[]) => {
  //   return media.map((item, index) => {
  //     if (item.type === "image") {
  //       return (
  //         <div key={index} className="w-24 h-24 relative mr-2">
  //           <Image
  //             src={item.url}
  //             alt={`Review media ${index + 1}`}
  //             fill
  //             className="object-cover rounded"
  //           />
  //         </div>
  //       );
  //     }
  //     return (
  //       <video
  //         key={index}
  //         src={item.url}
  //         className="w-24 h-24 object-cover rounded"
  //         controls
  //       />
  //     );
  //   });
  // };

  return (
    <main className="w-full mx-auto px-10 py-10 space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="col-span-1 bg-white shadow-md rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Reviews</h2>
          </div>
          <div className="divide-y">
            {reviews.map((review) => (
              <button
                key={review.id}
                onClick={() => handleReviewSelect(review)}
                className={`w-full text-left p-4 hover:bg-gray-100 ${
                  selectedReview?.id === review.id ? "bg-blue-50" : ""
                }`}
                type="button"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{review.user.name}</span>
                  <span
                    className={`font-bold ${
                      review.rating >= 8
                        ? "text-green-600"
                        : review.rating >= 5
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {review.rating}/10
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{review.dish}</p>
                {/* <div className="flex items-center mt-2">
                  {renderMediaPreview(review.media).slice(0, 2)}
                  {review.media.length > 2 && (
                    <div className="ml-2 text-sm text-gray-500">
                      +{review.media.length - 2} more
                    </div>
                  )}
                </div> */}
              </button>
            ))}
          </div>
        </div>

        {/* Review Details */}
        {selectedReview && (
          <div className="col-span-2 bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedReview.dish}</h2>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xl font-bold mr-2 ${
                      selectedReview.rating >= 8
                        ? "text-green-600"
                        : selectedReview.rating >= 5
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {selectedReview.rating}/10
                  </span>
                  <span className="text-gray-600">on {selectedReview.date}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedReview.resolved
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedReview.resolved ? "Resolved" : "Pending"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold">User Details</h3>
                <p>Name: {selectedReview.user.name}</p>
                <p>Hometown: {selectedReview.user.hometown}</p>
                <p>Disability: {selectedReview.user.disability}</p>
              </div>
              <div>
                <h3 className="font-semibold">Review Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedReview.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Review Text</h3>
              <p>{selectedReview.reviewText}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Media</h3>
              <div className="flex flex-wrap gap-2">
                {/* {renderMediaPreview(selectedReview.media)} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
