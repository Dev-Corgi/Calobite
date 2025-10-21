import fs from 'fs';
import path from 'path';
import { supabase } from './supabase';
import { STATIC_GENERATION_CONFIG, logIfVerbose } from './static-config';

/**
 * Reads and parses the top brands from topbrands.txt
 * Returns an array of unique brand names
 */
export function getTopBrands(): string[] {
  const filePath = path.join(process.cwd(), 'data', 'topbrands.txt');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const brands = new Set<string>();
  
  // Parse each line
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines, headers, and numbered lines
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('##')) {
      continue;
    }
    
    // Remove numbering (e.g., "1. McDonald's" -> "McDonald's")
    const match = trimmed.match(/^\d+\.\s*(.+)$/);
    if (match) {
      const brandName = match[1].trim();
      if (brandName) {
        brands.add(brandName);
      }
    }
  }
  
  return Array.from(brands);
}

/**
 * Normalize brand name for database comparison
 * Handles case-insensitive matching and special characters
 */
export function normalizeBrandName(brand: string): string {
  return brand
    .toLowerCase()
    .trim()
    .replace(/['']/g, "'") // Normalize apostrophes
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Fetches all product codes for the top brands from the database
 * Returns an array of product codes (barcodes)
 */
export async function getTopBrandProductCodes(): Promise<string[]> {
  const topBrands = getTopBrands();
  const productCodes: string[] = [];
  
  console.log(`Fetching products for ${topBrands.length} top brands...`);
  
  // Process brands in batches to avoid overwhelming the database
  const batchSize = STATIC_GENERATION_CONFIG.DB_BATCH_SIZE;
  for (let i = 0; i < topBrands.length; i += batchSize) {
    const batch = topBrands.slice(i, i + batchSize);
    
    // Build OR conditions for brand matching (case-insensitive)
    const orConditions = batch.map(brand => {
      // Use ilike for case-insensitive pattern matching
      // URL-encode the brand name to handle special characters (commas, apostrophes, etc.)
      const encodedBrand = encodeURIComponent(brand);
      return `brands.ilike.%${encodedBrand}%`;
    }).join(',');
    
    try {
      const queryLimit = STATIC_GENERATION_CONFIG.MAX_PRODUCTS_PER_BRAND || 1000;
      const { data, error } = await supabase
        .from('products')
        .select('code')
        .or(orConditions)
        .limit(queryLimit);
      
      if (error) {
        console.error(`Error fetching products for batch ${i / batchSize + 1}:`, error);
        continue;
      }
      
      if (data) {
        const codes = data.map(item => item.code);
        productCodes.push(...codes);
        logIfVerbose(`Batch ${i / batchSize + 1}/${Math.ceil(topBrands.length / batchSize)}: Found ${codes.length} products`);
      }
    } catch (err) {
      console.error(`Exception fetching products for batch ${i / batchSize + 1}:`, err);
    }
  }
  
  // Remove duplicates
  const uniqueCodes = Array.from(new Set(productCodes));
  console.log(`Total unique products found: ${uniqueCodes.length}`);
  
  return uniqueCodes;
}
