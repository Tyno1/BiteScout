import { FoodData } from "@/types/foodCatalogue";
import React from "react";

export default function Table({ foodDatas, handleRowClick }: any) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Ingredients
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Cuisine
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Course
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Allergens
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Images
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {foodDatas?.map((food: any, index: number) => (
            <tr
              onClick={() => handleRowClick(food._id)}
              key={index}
              className="hover:bg-gray-50 cursor-pointer
"
            >
              <td className="px-6 py-4">{food?.name}</td>
              <td className="px-6 py-4">
                {food?.ingredients?.map((i: string) => i).join(", ")}
              </td>
              <td className="px-6 py-4">{food?.cuisineType?.name}</td>
              <td className="px-6 py-4">{food?.course?.name}</td>
              <td className="px-6 py-4">
                {food?.price?.currency}
                {food?.price?.amount}
              </td>
              <td className="px-6 py-4">
                {food.allergens.map((a: any) => a.name).join(", ")}
              </td>
              <td className="px-6 py-4">{food.images.length} images</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
