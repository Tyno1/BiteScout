import type { formErrorType } from "@/app/dashboard/food-catalogue/page";
import { Button, IconButton, Input, Select } from "@/components/atoms";
import type {
	Allergen,
	Course,
	Cuisine,
	FoodCatalogue,
} from "@shared/types/api/schemas";
import type { Currency } from "@shared/types/common";
import { X } from "lucide-react";
import type React from "react";
import type { ReactNode } from "react";

type FoodCatalogueModalType = {
	setNewFood: React.Dispatch<React.SetStateAction<FoodCatalogue>>;
	newFood: FoodCatalogue;
	cuisineData: Cuisine[];
	courseData: Course[];
	allergenData: Allergen[];
	handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	toggleAllergen: (allergen: Allergen) => void;
	currencies: string[];
	handleAddIngredients: (ingredient: string) => void;
	handleRemoveIngredients: (ingredient: string) => void;
	setIngredient: (ingredient: string) => void;
	ingredient: string;
	formError: formErrorType;
	FormWarning: (message: string) => ReactNode;
};
export function AddNewFood({
	setNewFood,
	newFood,
	cuisineData,
	courseData,
	allergenData,
	handleImageUpload,
	toggleAllergen,
	currencies,
	handleAddIngredients,
	handleRemoveIngredients,
	setIngredient,
	ingredient,
	formError,
	FormWarning,
}: FoodCatalogueModalType) {
	return (
		<div className="p-6">
			<div className="grid grid-cols-2 gap-4">
				<Input
					label="Food Name"
					outlineType="round"
					name="food-name"
					useLabel
					type="text"
					placeholder="Enter food name"
					value={newFood.name}
					onChange={(e) =>
						setNewFood((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
					errorMessage={formError.name && FormWarning("Name is required")}
				/>

				<div className="w-[100%] overflow-hidden">
					<label htmlFor="ingredient" className="block mb-2">Ingredients</label>
					{formError.ingredients && FormWarning("Ingredients is required")}

					<div
						className={`w-full border rounded flex items-center  ${
							formError.ingredients
								? "border-red focus:ring-red-500 focus:border-red"
								: "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
						}`}
					>
						<input
							onKeyDown={(e) =>
								e.key === "Enter" ? handleAddIngredients(ingredient) : null
							}
							id="ingredient"
							type="text"
							placeholder="List ingredients"
							value={ingredient}
							onChange={(e) => setIngredient(e.target.value)}
							className="p-2 flex-4 w-[80%]"
						/>
						<button
							type="button"
							onClick={() => handleAddIngredients(ingredient)}
							className="bg-black text-white h-full w-[20%] p-2 rounded"
						>
							Add
						</button>
					</div>
					<div className="flex gap-2 mt-2 overflow-x-auto">
						{newFood.ingredients.map((ingredient: string, index: number) => (
							<div
								key={ingredient}
								className="flex items-center gap-2 text-sm bg-black rounded-xl px-2 py-1"
							>
								<span className="text-white ">{ingredient}</span>

								<IconButton
									icon={<X size={16} />}
									size="xs"
									variant="plain"
									color="primary"
									onClick={() => handleRemoveIngredients(ingredient)}
								/>
							</div>
						))}
					</div>
				</div>

				<Select
					label="Cuisine Type"
					name="cuisine-type"
					useLabel
					outlineType="round"
					options={
						cuisineData?.map((cuisine: Cuisine) => ({
							value: cuisine?._id ?? "",
							label: cuisine?.name,
						})) || []
					}
					value={newFood?.cuisineType?._id}
					onChange={(e) =>
						setNewFood((prev: FoodCatalogue) => ({
							...prev,
							cuisineType: cuisineData.find((cuisine) => cuisine._id === e.target.value) as Cuisine,
						}))
					}
					errorMessage={
						formError.cuisineType && FormWarning("Cuisine Type is required")
					}
				/>

				<Select
					label="Course"
					name="course"
					useLabel
					outlineType="round"
					options={
						courseData?.map((course: Course) => ({
							value: course?._id ?? "",
							label: course?.name,
						})) || []
					}
					value={newFood?.course?._id}
					onChange={(e) =>
						setNewFood((prev: FoodCatalogue) => ({
							...prev,
							course: courseData.find((course) => course._id === e.target.value) as Course,
						}))
					}
					errorMessage={formError.course && FormWarning("Course is required")}
				/>

				<div className="flex gap-2 items-end">
					<Input
						fullWidth
						label="Price"
						outlineType="round"
						name="price"
						useLabel
						type="number"
						step="0.01"
						min="0"
						onWheel={(e) => e.currentTarget.blur()}
						inputMode="decimal"
						placeholder="0.00"
						value={newFood.price.amount}
						onChange={(e) =>
							setNewFood((prev: FoodCatalogue) => ({
								...prev,
								price: {
									...prev.price,
									amount: Number.parseFloat(e.target.value),
								},
							}))
						}
						errorMessage={formError.name && FormWarning("Name is required")}
					/>

					<Select
						className="w-[100px]"
						label="Currencies"
						name="currencies"
						outlineType="round"
						options={
							currencies?.map((currency: string) => ({
								value: currency ?? "",
								label: currency,
							})) || []
						}
						value={newFood?.course?._id}
						onChange={(e) =>
							setNewFood((prev: FoodCatalogue) => ({
								...prev,
								price: {
									...prev.price,
									currency: e.target.value as Currency,
								},
							}))
						}
						errorMessage={formError.course && FormWarning("Course is required")}
					/>
				</div>

				<Input
					label="Image"
					name="image"
					useLabel
					outlineType="round"
					type="file"
					multiple
					accept="image/*"
					onChange={handleImageUpload}
				/>
			</div>

			<div className="mt-4">
				<label htmlFor="allergens" className="block mb-3">Allergens</label>
				{formError.allergens && FormWarning("Allergens is required")}

				<div className="flex flex-wrap gap-2">
					{allergenData.map((allergen: Allergen) => (
						<Button
							size="sm"
							color="black"
							variant={
								newFood.allergens?.some((a) => a._id === allergen._id)
									? "solid"
									: "outline"
							}
							text={allergen.name}
							key={allergen._id}
							onClick={() => toggleAllergen(allergen)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
