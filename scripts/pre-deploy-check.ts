#!/usr/bin/env tsx
/**
 * Pre-deployment checklist script
 * 배포 전 필수 확인사항을 체크합니다.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

interface CheckResult {
  name: string;
  passed: boolean;
  message: string;
  critical: boolean;
}

const results: CheckResult[] = [];

function addResult(name: string, passed: boolean, message: string, critical = false) {
  results.push({ name, passed, message, critical });
}

async function checkEnvironmentVariables() {
  console.log('\n🔍 Checking environment variables...');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  for (const varName of requiredVars) {
    const value = process.env[varName];
    if (!value) {
      addResult(
        `Environment Variable: ${varName}`,
        false,
        `❌ Missing required environment variable: ${varName}`,
        true
      );
    } else {
      addResult(
        `Environment Variable: ${varName}`,
        true,
        `✅ ${varName} is set`,
        true
      );
    }
  }
}

async function checkSupabaseConnection() {
  console.log('\n🔍 Checking Supabase connection...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    addResult(
      'Supabase Connection',
      false,
      '❌ Cannot test connection - missing credentials',
      true
    );
    return;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('products')
      .select('code')
      .limit(1);
    
    if (error) {
      addResult(
        'Supabase Connection',
        false,
        `❌ Database connection failed: ${error.message}`,
        true
      );
    } else {
      addResult(
        'Supabase Connection',
        true,
        `✅ Successfully connected to Supabase`,
        true
      );
    }
  } catch (error) {
    addResult(
      'Supabase Connection',
      false,
      `❌ Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      true
    );
  }
}

async function checkRequiredFiles() {
  console.log('\n🔍 Checking required files...');
  
  const requiredFiles = [
    'package.json',
    'next.config.ts',
    'tsconfig.json',
    'data/topbrands.txt',
    'lib/static-config.ts',
    'lib/top-brands.ts'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(process.cwd(), file);
    const exists = fs.existsSync(filePath);
    
    addResult(
      `File: ${file}`,
      exists,
      exists ? `✅ ${file} exists` : `❌ Missing required file: ${file}`,
      true
    );
  }
}

async function checkTopBrands() {
  console.log('\n🔍 Checking top brands file...');
  
  const brandsFile = path.join(process.cwd(), 'data/topbrands.txt');
  
  if (!fs.existsSync(brandsFile)) {
    addResult(
      'Top Brands File',
      false,
      '❌ data/topbrands.txt not found',
      true
    );
    return;
  }
  
  const content = fs.readFileSync(brandsFile, 'utf-8');
  const brands = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
  
  if (brands.length === 0) {
    addResult(
      'Top Brands File',
      false,
      '❌ data/topbrands.txt is empty',
      true
    );
  } else {
    addResult(
      'Top Brands File',
      true,
      `✅ Found ${brands.length} brands in topbrands.txt`,
      false
    );
  }
}

async function checkGitIgnore() {
  console.log('\n🔍 Checking .gitignore...');
  
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    addResult(
      '.gitignore',
      false,
      '⚠️  .gitignore not found',
      false
    );
    return;
  }
  
  const content = fs.readFileSync(gitignorePath, 'utf-8');
  const hasEnv = content.includes('.env');
  const hasNext = content.includes('.next');
  const hasNodeModules = content.includes('node_modules');
  
  if (hasEnv && hasNext && hasNodeModules) {
    addResult(
      '.gitignore',
      true,
      '✅ .gitignore properly configured',
      false
    );
  } else {
    addResult(
      '.gitignore',
      false,
      '⚠️  .gitignore missing important entries',
      false
    );
  }
}

async function checkPackageJson() {
  console.log('\n🔍 Checking package.json...');
  
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  
  const requiredScripts = ['build', 'start', 'check-brands'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    addResult(
      'package.json scripts',
      false,
      `⚠️  Missing scripts: ${missingScripts.join(', ')}`,
      false
    );
  } else {
    addResult(
      'package.json scripts',
      true,
      '✅ All required scripts present',
      false
    );
  }
  
  // Check for required dependencies
  const requiredDeps = ['next', 'react', '@supabase/supabase-js'];
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );
  
  if (missingDeps.length > 0) {
    addResult(
      'package.json dependencies',
      false,
      `❌ Missing dependencies: ${missingDeps.join(', ')}`,
      true
    );
  } else {
    addResult(
      'package.json dependencies',
      true,
      '✅ All required dependencies present',
      false
    );
  }
}

function printResults() {
  console.log('\n' + '='.repeat(60));
  console.log('📋 PRE-DEPLOYMENT CHECK RESULTS');
  console.log('='.repeat(60));
  
  const criticalChecks = results.filter(r => r.critical);
  const nonCriticalChecks = results.filter(r => !r.critical);
  
  console.log('\n🔴 CRITICAL CHECKS:');
  criticalChecks.forEach(result => {
    console.log(`  ${result.message}`);
  });
  
  console.log('\n🟡 NON-CRITICAL CHECKS:');
  nonCriticalChecks.forEach(result => {
    console.log(`  ${result.message}`);
  });
  
  const criticalFailed = criticalChecks.filter(r => !r.passed).length;
  const criticalTotal = criticalChecks.length;
  const nonCriticalFailed = nonCriticalChecks.filter(r => !r.passed).length;
  const nonCriticalTotal = nonCriticalChecks.length;
  
  console.log('\n' + '='.repeat(60));
  console.log(`Critical: ${criticalTotal - criticalFailed}/${criticalTotal} passed`);
  console.log(`Non-Critical: ${nonCriticalTotal - nonCriticalFailed}/${nonCriticalTotal} passed`);
  console.log('='.repeat(60));
  
  if (criticalFailed > 0) {
    console.log('\n❌ DEPLOYMENT BLOCKED: Fix critical issues before deploying!');
    console.log('\nNext steps:');
    console.log('1. Fix all critical issues listed above');
    console.log('2. Run this script again: npm run pre-deploy-check');
    console.log('3. Once all checks pass, proceed with deployment');
    process.exit(1);
  } else if (nonCriticalFailed > 0) {
    console.log('\n⚠️  WARNING: Some non-critical checks failed');
    console.log('You can proceed with deployment, but consider fixing these issues.');
    console.log('\n✅ Ready to deploy!');
  } else {
    console.log('\n✅ ALL CHECKS PASSED! Ready to deploy!');
    console.log('\nNext steps:');
    console.log('1. Run: vercel --prod');
    console.log('2. Or push to GitHub for automatic deployment');
  }
}

async function main() {
  console.log('🚀 Running pre-deployment checks...');
  console.log('This will verify that your project is ready for deployment.\n');
  
  await checkEnvironmentVariables();
  await checkSupabaseConnection();
  await checkRequiredFiles();
  await checkTopBrands();
  await checkGitIgnore();
  await checkPackageJson();
  
  printResults();
}

main().catch(error => {
  console.error('❌ Error running pre-deployment checks:', error);
  process.exit(1);
});
