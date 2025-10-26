#!/usr/bin/env node
/**
 * SEO Validation Script
 * Validates JSON-LD schemas and meta tags across all pages
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

const PAGES_TO_VALIDATE = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/services', name: 'Services Overview' },
  { path: '/services/web-development', name: 'Web Development Service' },
  { path: '/services/mobile-development', name: 'Mobile Development Service' },
  { path: '/services/ui-ux-design', name: 'UI/UX Design Service' },
  { path: '/services/backend-solutions', name: 'Backend Solutions Service' },
  { path: '/faq', name: 'FAQ Page' },
  { path: '/glossar', name: 'Glossary Overview' },
  { path: '/glossar/react', name: 'Glossary Detail (React)' },
  { path: '/vergleiche', name: 'Comparisons Overview' },
  { path: '/vergleiche/react-vs-vue', name: 'Comparison Detail' },
  { path: '/blog', name: 'Blog Overview' },
  { path: '/portfolio', name: 'Portfolio Overview' },
  { path: '/regionen', name: 'Regionen Overview' },
  { path: '/regionen/lauda-koenigshofen', name: 'Region Detail' },
  { path: '/imprint', name: 'Imprint' },
  { path: '/privacy', name: 'Privacy' },
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractJSONLD(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
  let match;

  while ((match = regex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (e) {
      schemas.push({ error: 'Failed to parse JSON-LD', raw: match[1].substring(0, 100) });
    }
  }

  return schemas;
}

function extractMetaTags(html) {
  const meta = {};

  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  if (titleMatch) meta.title = titleMatch[1].replace(/&amp;/g, '&');

  // Meta description
  const descMatch = html.match(/<meta name="description" content="(.*?)"/);
  if (descMatch) meta.description = descMatch[1];

  // Meta keywords
  const keywordsMatch = html.match(/<meta name="keywords" content="(.*?)"/);
  if (keywordsMatch) meta.keywords = keywordsMatch[1];

  // Canonical
  const canonicalMatch = html.match(/<link rel="canonical" href="(.*?)"/);
  if (canonicalMatch) meta.canonical = canonicalMatch[1];

  // OG tags
  const ogTitleMatch = html.match(/<meta property="og:title" content="(.*?)"/);
  if (ogTitleMatch) meta.ogTitle = ogTitleMatch[1].replace(/&amp;/g, '&');

  const ogDescMatch = html.match(/<meta property="og:description" content="(.*?)"/);
  if (ogDescMatch) meta.ogDescription = ogDescMatch[1];

  const ogImageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
  if (ogImageMatch) meta.ogImage = ogImageMatch[1];

  const ogUrlMatch = html.match(/<meta property="og:url" content="(.*?)"/);
  if (ogUrlMatch) meta.ogUrl = ogUrlMatch[1];

  // Twitter tags
  const twitterCardMatch = html.match(/<meta name="twitter:card" content="(.*?)"/);
  if (twitterCardMatch) meta.twitterCard = twitterCardMatch[1];

  // H1 tags
  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  meta.h1Count = h1Matches.length;
  meta.h1Texts = h1Matches.map(h1 => h1.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim());

  return meta;
}

function validateMetadata(meta, pageName) {
  const issues = [];
  const warnings = [];

  // Title validation
  if (!meta.title) {
    issues.push('❌ CRITICAL: Missing <title> tag');
  } else {
    const titleLength = meta.title.length;
    if (titleLength > 60) {
      warnings.push(`⚠️ Title too long: ${titleLength} chars (recommended: <60)`);
    } else if (titleLength < 30) {
      warnings.push(`⚠️ Title too short: ${titleLength} chars (recommended: 50-60)`);
    }
  }

  // Description validation
  if (!meta.description) {
    issues.push('❌ CRITICAL: Missing meta description');
  } else {
    const descLength = meta.description.length;
    if (descLength > 160) {
      warnings.push(`⚠️ Description too long: ${descLength} chars (recommended: 150-160)`);
    } else if (descLength < 120) {
      warnings.push(`⚠️ Description too short: ${descLength} chars (recommended: 150-160)`);
    }
  }

  // H1 validation
  if (meta.h1Count === 0) {
    issues.push('❌ CRITICAL: No H1 tag found');
  } else if (meta.h1Count > 1) {
    issues.push(`❌ CRITICAL: Multiple H1 tags found (${meta.h1Count})`);
  }

  // Canonical validation
  if (!meta.canonical) {
    warnings.push('⚠️ Missing canonical URL');
  }

  // Open Graph validation
  if (!meta.ogTitle) warnings.push('⚠️ Missing og:title');
  if (!meta.ogDescription) warnings.push('⚠️ Missing og:description');
  if (!meta.ogImage) {
    issues.push('❌ CRITICAL: Missing og:image');
  } else if (meta.ogImage.includes('headon-logo.svg')) {
    warnings.push('⚠️ OG image is logo.svg (should be proper OG image 1200x630)');
  }

  // Twitter card validation
  if (!meta.twitterCard) warnings.push('⚠️ Missing twitter:card');

  return { issues, warnings };
}

async function validatePage(pageInfo) {
  const url = BASE_URL + pageInfo.path;
  console.log(`\n🔍 Validating: ${pageInfo.name} (${pageInfo.path})`);

  try {
    const html = await fetchPage(url);
    const schemas = extractJSONLD(html);
    const meta = extractMetaTags(html);
    const validation = validateMetadata(meta, pageInfo.name);

    // Print meta info
    console.log(`\n📋 Meta Tags:`);
    console.log(`  Title: "${meta.title}" (${meta.title?.length || 0} chars)`);
    console.log(`  Description: "${meta.description?.substring(0, 80)}..." (${meta.description?.length || 0} chars)`);
    console.log(`  H1 Count: ${meta.h1Count}`);
    if (meta.h1Texts.length > 0) {
      meta.h1Texts.forEach((h1, i) => {
        console.log(`    H1 ${i + 1}: "${h1.substring(0, 80)}${h1.length > 80 ? '...' : ''}"`);
      });
    }
    console.log(`  Canonical: ${meta.canonical || 'MISSING'}`);
    console.log(`  OG Image: ${meta.ogImage || 'MISSING'}`);

    // Print schemas
    console.log(`\n📊 JSON-LD Schemas: ${schemas.length} found`);
    schemas.forEach((schema, i) => {
      if (schema.error) {
        console.log(`  ${i + 1}. ❌ ERROR: ${schema.error}`);
      } else {
        const type = Array.isArray(schema['@type']) ? schema['@type'].join(', ') : schema['@type'];
        console.log(`  ${i + 1}. ${type}`);
      }
    });

    // Print validation results
    if (validation.issues.length > 0) {
      console.log(`\n❌ CRITICAL ISSUES (${validation.issues.length}):`);
      validation.issues.forEach(issue => console.log(`  ${issue}`));
    }

    if (validation.warnings.length > 0) {
      console.log(`\n⚠️  WARNINGS (${validation.warnings.length}):`);
      validation.warnings.forEach(warning => console.log(`  ${warning}`));
    }

    if (validation.issues.length === 0 && validation.warnings.length === 0) {
      console.log(`\n✅ All checks passed!`);
    }

    return {
      page: pageInfo.name,
      path: pageInfo.path,
      meta,
      schemas,
      validation,
      status: validation.issues.length === 0 ? 'PASS' : 'FAIL'
    };
  } catch (error) {
    console.error(`\n❌ ERROR: Failed to fetch ${pageInfo.path}: ${error.message}`);
    return {
      page: pageInfo.name,
      path: pageInfo.path,
      status: 'ERROR',
      error: error.message
    };
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('🔍 SEO VALIDATION REPORT');
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Pages to validate: ${PAGES_TO_VALIDATE.length}`);
  console.log('═══════════════════════════════════════════════════════════');

  const results = [];

  for (const pageInfo of PAGES_TO_VALIDATE) {
    const result = await validatePage(pageInfo);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between requests
  }

  // Summary
  console.log('\n\n═══════════════════════════════════════════════════════════');
  console.log('📊 VALIDATION SUMMARY');
  console.log('═══════════════════════════════════════════════════════════');

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const errors = results.filter(r => r.status === 'ERROR').length;

  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`🔴 Errors: ${errors}`);
  console.log(`📄 Total: ${results.length}`);

  if (failed > 0) {
    console.log('\n❌ Pages with critical issues:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`  - ${r.page} (${r.path}): ${r.validation.issues.length} issues`);
    });
  }

  const allCriticalIssues = results.reduce((acc, r) => acc + (r.validation?.issues.length || 0), 0);
  const allWarnings = results.reduce((acc, r) => acc + (r.validation?.warnings.length || 0), 0);

  console.log(`\n📊 Total Critical Issues: ${allCriticalIssues}`);
  console.log(`📊 Total Warnings: ${allWarnings}`);

  console.log('\n═══════════════════════════════════════════════════════════');

  // Return exit code based on critical issues
  process.exit(allCriticalIssues > 0 ? 1 : 0);
}

main().catch(console.error);
