/**
 * Script to test and verify top brands functionality
 * 
 * Usage:
 *   npm run check-brands
 *   or
 *   npx tsx -r dotenv/config scripts/check-top-brands.ts dotenv_config_path=.env.local
 */

import { getTopBrands, getTopBrandProductCodes } from '../lib/top-brands';

async function main() {
  console.log('=== Top Brands Checker ===\n');
  
  // 1. Check brand parsing
  console.log('1. Parsing top brands from topbrands.txt...');
  const brands = getTopBrands();
  console.log(`   Found ${brands.length} unique brands`);
  console.log(`   First 10 brands: ${brands.slice(0, 10).join(', ')}\n`);
  
  // 2. Check database connectivity and product counts
  console.log('2. Fetching product codes from database...');
  console.log('   This may take a few minutes...\n');
  
  const startTime = Date.now();
  const productCodes = await getTopBrandProductCodes();
  const endTime = Date.now();
  
  console.log(`\n=== Results ===`);
  console.log(`Total unique products: ${productCodes.length}`);
  console.log(`Time taken: ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
  console.log(`\nFirst 10 product codes: ${productCodes.slice(0, 10).join(', ')}`);
  
  // 3. Provide build estimates
  console.log(`\n=== Build Estimates ===`);
  console.log(`If you generate all ${productCodes.length} pages:`);
  console.log(`  - Build time: ~${Math.ceil(productCodes.length / 100)} minutes (rough estimate)`);
  console.log(`  - Disk space: ~${(productCodes.length * 50 / 1024).toFixed(2)} MB (rough estimate)`);
  
  const recommendedLimit = Math.min(productCodes.length, 10000);
  console.log(`\nRecommended: Generate ${recommendedLimit} pages (currently configured in page.tsx)`);
}

main().catch(console.error);
