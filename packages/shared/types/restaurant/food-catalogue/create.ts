// Food Catalogue Create Types - All food catalogue creation-related request, response, and error types
import type { paths } from '../../api';

// Request
export type CreateFoodCatalogueRequest = paths['/api/food-catalogue']['post']['requestBody']['content']['application/json'];

// Response
export type CreateFoodCatalogueResponse = paths['/api/food-catalogue']['post']['responses']['201']['content']['application/json']; 