import React from "react";

export default function Table({ foods }: any) {
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
          {foods.map((food: any, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">{food.name}</td>
              <td className="px-6 py-4">{food.ingredients}</td>
              <td className="px-6 py-4">{food.cuisineType}</td>
              <td className="px-6 py-4">{food.mealComponent}</td>
              <td className="px-6 py-4">${food.price}</td>
              <td className="px-6 py-4">{food.allergens.join(", ")}</td>
              <td className="px-6 py-4">{food.images.length} images</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
