// project/lib/types.ts

/**
 * Interface for the nutriments JSONB object.
 * Allows for flexible nutrient keys (e.g., 'energy-kcal_100g').
 */
export interface Nutriments {
  [key: string]: string | number | null | undefined;
  'energy-kcal_100g'?: number;
  'energy_100g'?: number;
  'energy-kj_100g'?: number;
  fat_100g?: number;
  'saturated-fat_100g'?: number;
  carbohydrates_100g?: number;
  sugars_100g?: number;
  proteins_100g?: number;
  salt_100g?: number;
  sodium_100g?: number;
}

/**
 * Interface for the Product object, based on the 'products' table schema.
 */
export interface Product {
  code: string;
  product_name?: string;
  brands?: string;
  quantity?: string;
  packaging?: string;
  categories?: string;
  labels?: string;
  stores?: string;
  countries?: string;
  ingredients_text?: string;
  traces?: string;
  serving_size?: string;
  serving_quantity?: number;
  nutriscore_score?: number;
  nutriscore_grade?: string;
  ecoscore_score?: number;
  ecoscore_grade?: string;
  nova_group?: number;
  image_url?: string;
  image_small_url?: string;
  nutriments?: Nutriments;
  created_t?: string;
  last_modified_t?: string;
  search_vector?: string; // From text search
  view_count?: number; // From rpc call
}
