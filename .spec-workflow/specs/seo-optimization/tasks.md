# Tasks Document

## 🚨 PRIORITÄT 0: KRITISCHE FIXES (SOFORT)

- [x] 1. Verify and optimize H1 tag on homepage
  - File: components/sections/HeroSection.tsx
  - Action: Verify H1 tag exists and contains optimal keywords (lines 212-266)
  - Purpose: Ensure search engines can identify page topic
  - _Leverage: components/sections/HeroSection.tsx (lines 212-266), .spec-workflow/specs/seo-optimization/requirements.md (Requirement 1), SEO keyword list_
  - _Requirements: 1_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Specialist & Frontend Developer with expertise in semantic HTML and keyword optimization | Task: Verify and optimize the H1 tag in components/sections/HeroSection.tsx (lines 212-266). The H1 currently exists and contains "Full-Service Digitalagentur für Webentwicklung, Apps & kreatives Design". Verify this renders in live HTML and optimize keyword balance if needed. Reference Requirement 1 from requirements.md for keyword targets. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT add multiple H1 tags - keep exactly one H1 per page, Do NOT remove existing H1 - only verify and optimize content, Do NOT change component structure or styling, Maintain natural language flow (no keyword stuffing) | \_Leverage: components/sections/HeroSection.tsx (lines 212-266), .spec-workflow/specs/seo-optimization/requirements.md (Requirement 1), SEO keyword list: "Digitalagentur", "Kreativagentur", "Webagentur", "Web", "App", "Design" | Success: Exactly 1 H1 tag exists on homepage, H1 contains primary keywords naturally ("Digitalagentur", "Web", "App"), H1 is visible in rendered HTML (verify with curl or browser inspection), Keyword balance is optimal (not too dev-heavy, includes "Design" and agency terms)_

- [x] 2. Audit H1 tags across all pages
  - Files: app/page.tsx, app/services/[service]/page.tsx, app/blog/[slug]/page.tsx, app/about/page.tsx, app/contact/page.tsx
  - Action: Verify each page has exactly one H1 tag with page-specific keywords
  - Purpose: Ensure all pages follow H1 best practices for SEO
  - _Leverage: Existing page components, Grep tool for H1 search_
  - _Requirements: 1_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Auditor & Frontend Developer with expertise in HTML structure validation | Task: Audit all major pages to ensure each has exactly one H1 tag with page-specific keywords. Check: homepage, service pages, blog posts, about page, contact page. Reference Requirement 1 from requirements.md for H1 guidelines. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT add H1 tags if page already has one, Do NOT create multiple H1 tags on any page, Do NOT change page layouts or styling, If H1 is missing add it according to page content and purpose | \_Leverage: Grep tool to search for H1 tags (grep -r "<h1" app/), Read tool to inspect page components, .spec-workflow/specs/seo-optimization/requirements.md (Requirement 1) | Success: All major pages have exactly 1 H1 tag, Each H1 contains page-specific keywords (e.g. service pages: "Web Development Service"), H1 tags are not empty and render in HTML, Document any pages that needed fixes in commit message_

## 🔴 PRIORITÄT 1: FOUNDATIONS (WOCHE 1-2)

- [x] 3. Verify and enhance homepage metadata
  - File: app/page.tsx
  - Action: Verify existing metadata (lines 10-51) and ensure OG image path is correct
  - Purpose: Confirm homepage metadata follows SEO best practices
  - _Leverage: app/page.tsx existing metadata, lib/seo/meta-builder.ts utilities_
  - _Requirements: 2_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Specialist with expertise in Next.js Metadata API and Open Graph optimization | Task: Verify homepage metadata in app/page.tsx (lines 10-51). Check that title, description, keywords, and Open Graph tags are optimized per Requirement 2. Verify OG image path exists or update to correct path. The metadata structure is already comprehensive - mainly verify and polish. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT remove existing metadata - only verify and enhance, Do NOT change metadata structure - it follows Next.js Metadata API correctly, Maintain keyword array format (comma-separated in .join()), Keep descriptions under 160 characters | \_Leverage: app/page.tsx (existing metadata lines 10-51), lib/seo/meta-builder.ts (for reference on best practices), .spec-workflow/specs/seo-optimization/requirements.md (Requirement 2) | Success: Title is under 60 characters and contains primary keywords, Description is 150-160 characters, Keywords array includes all primary and secondary keywords from requirements, Open Graph image path is correct and image exists (or placeholder noted), All metadata follows Next.js Metadata API conventions_

- [x] 4. Create OG Image Generator utility
  - File: lib/seo/og-image-generator.ts (NEW)
  - Action: Create utility to generate and validate Open Graph image URLs
  - Purpose: Centralized OG image URL management with validation
  - _Leverage: lib/seo/meta-builder.ts patterns, TypeScript interfaces_
  - _Requirements: 6_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Full-Stack Developer with expertise in TypeScript utilities and SEO metadata | Task: Create a new utility file lib/seo/og-image-generator.ts following the design in design.md (Component 2: OG Image Generator Utility). Implement getOGImageUrl() and validateOGImageExists() functions per Requirement 6. This utility will provide centralized OG image URL generation for all pages. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT generate actual images - this utility only provides URLs, Use fs module only in development for validation (not in production), Follow existing utility patterns from lib/seo/meta-builder.ts, Ensure TypeScript strict mode compliance | \_Leverage: .spec-workflow/specs/seo-optimization/design.md (Component 2), lib/seo/meta-builder.ts (for pattern reference), process.env.NEXT_PUBLIC_SITE_URL for base URL | Success: getOGImageUrl() returns correct absolute URLs for all page types, validateOGImageExists() checks file presence in dev (optional in prod), Falls back to default logo if custom image missing, TypeScript interfaces defined for OGImageOptions, Code follows project conventions and passes type check_

- [x] 5. Create reusable FAQAccordion component
  - File: components/seo/FAQAccordion.tsx (NEW)
  - Action: Build reusable FAQ accordion with integrated FAQPage schema generation
  - Purpose: DRY component for FAQ sections across multiple pages
  - _Leverage: components/seo/SchemaGenerator.tsx FAQSchema, Framer Motion for animation_
  - _Requirements: 5_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Frontend Developer specializing in React components and accessibility | Task: Create FAQAccordion component in components/seo/FAQAccordion.tsx following design.md (Component 1). This is a reusable client component that renders FAQ items with collapsible animations and automatically generates FAQPage schema. Must support Requirement 5's criteria. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Must be a 'use client' component (uses Framer Motion), Do NOT create new schema builders - use existing FAQSchema from SchemaGenerator, Ensure keyboard accessibility (Enter/Space to toggle, Arrow keys to navigate), Keep animations lightweight to maintain performance | \_Leverage: components/seo/SchemaGenerator.tsx (FAQSchema wrapper), lib/types/content.ts (FAQ interface - already exists), framer-motion for accordion animation, .spec-workflow/specs/seo-optimization/design.md (Component 1) | Success: Component accepts FAQ[] array and renders collapsible items, FAQSchema automatically generated when includeSchema=true, Animations are smooth and performant (60fps), Fully keyboard accessible (WCAG 2.1 compliant), Mobile-optimized with proper touch targets, TypeScript interfaces defined for props_

- [x] 6. Create centralized FAQ data source
  - File: lib/content/faq-data.ts (NEW)
  - Action: Create TypeScript data file with FAQ collections (general, service-specific)
  - Purpose: Single source of truth for all FAQ content across the site
  - _Leverage: lib/types/content.ts FAQ interface_
  - _Requirements: 5, 7_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Content Strategist & TypeScript Developer with SEO expertise | Task: Create lib/content/faq-data.ts with comprehensive FAQ collections following design.md (Data Model 1). Include general FAQs (7+) and service-specific FAQs (5-7 per service) per Requirements 5 and 7. FAQs must target common search queries for featured snippets. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT duplicate FAQs across categories, Questions must be natural language (how users search), Answers must be 2-4 sentences clear and actionable, Include pricing timeline technology and process questions | \_Leverage: lib/types/content.ts (FAQ interface), .spec-workflow/specs/seo-optimization/design.md (Data Model 1), docs/seo-optimierung-plan.md (FAQ examples from section 2.1) | Success: FAQCollection interface defined with typed categories, 7+ general FAQs covering common business questions, 5-7 FAQs per service (webDevelopment mobileDevelopment uiUxDesign backendSolutions), All FAQs target featured snippet opportunities, Questions formatted as natural search queries, Code passes TypeScript type check_

- [x] 7. Create dedicated FAQ page
  - File: app/faq/page.tsx (NEW)
  - Action: Build dedicated FAQ page with FAQAccordion and FAQPage schema
  - Purpose: Central location for all general FAQs, optimized for featured snippets
  - _Leverage: FAQAccordion component, faq-data.ts, meta-builder.ts_
  - _Requirements: 5_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Full-Stack Developer with expertise in Next.js App Router and SEO optimization | Task: Create app/faq/page.tsx with dedicated FAQ page following design.md (Component 3 structure). Use FAQAccordion component and general FAQs from faq-data.ts. Implement Metadata API for SEO per Requirement 5. This page is a key target for Google featured snippets. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Must be a Server Component (do NOT add 'use client'), Use generatePageMetadata from meta-builder.ts for metadata, Do NOT manually generate FAQPage schema - FAQAccordion handles it, Keep page simple and focused - FAQ list is the star | \_Leverage: components/seo/FAQAccordion.tsx (renders FAQs + schema), lib/content/faq-data.ts (faqData.general array), lib/seo/meta-builder.ts (generatePageMetadata function), .spec-workflow/specs/seo-optimization/design.md (Component 3) | Success: Page renders at /faq with all general FAQs, Metadata includes "FAQ" in title and optimized description, FAQPage schema automatically generated by FAQAccordion, Page is statically generated (SSG) for optimal performance, Mobile-responsive and accessible, Heading hierarchy correct (H1 for page title)_

- [x] 8. Add FAQ sections to service pages
  - Files: app/services/web-development/page.tsx, app/services/mobile-development/page.tsx, app/services/ui-ux-design/page.tsx, app/services/backend-solutions/page.tsx
  - Action: Integrate FAQAccordion with service-specific FAQs into existing service pages
  - Purpose: Add FAQ sections to service pages for service-specific featured snippets
  - _Leverage: FAQAccordion component, service-specific FAQs from faq-data.ts_
  - _Requirements: 7_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Full-Stack Developer with expertise in Next.js and content integration | Task: Enhance all 4 service pages (web-development mobile-development ui-ux-design backend-solutions) by adding FAQ sections using FAQAccordion component per Requirement 7. Each service gets its specific FAQ collection from faq-data.ts. This enables service-specific featured snippets in search results. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT change existing service page structure/styling, Add FAQ section near bottom before CTA section, Use service-specific FAQs only (e.g. faqData.webDevelopment for web-development), Do NOT duplicate FAQs across services | \_Leverage: components/seo/FAQAccordion.tsx, lib/content/faq-data.ts (webDevelopment mobileDevelopment uiUxDesign backendSolutions arrays), Existing service page components | Success: All 4 service pages have FAQ section with service-specific questions, FAQs appear before final CTA section, FAQPage schema generated for each service page, Styling matches existing service page design, Each service has 5-7 relevant FAQs_

- [x] 9. Optimize homepage content for keyword balance
  - File: components/sections/HeroSection.tsx
  - Action: Enhance hero text (lines 268-274) to include balanced keywords per Requirement 4
  - Purpose: Improve keyword density for "Design", "Kreativagentur", "Marketingagentur"
  - _Leverage: Existing hero content, keyword targets from requirements.md_
  - _Requirements: 4_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Copywriter & Frontend Developer with expertise in keyword optimization | Task: Optimize hero section content in components/sections/HeroSection.tsx (lines 268-274) to improve keyword balance per Requirement 4. Current text is dev-heavy and needs more "Design" "Kreativagentur" "Marketingagentur" keywords while maintaining natural flow. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT keyword stuff - maintain natural compelling copy, Keep text concise and readable, Do NOT change component structure or styling, Preserve the paragraph's core message about KI-powered agency services | \_Leverage: .spec-workflow/specs/seo-optimization/requirements.md (Requirement 4 section 1.4), docs/seo-optimierung-plan.md (keyword density targets lines 317-326), Current hero text at lines 268-274 | Success: Text includes "Kreativagentur" or "Kreativ-" naturally, "Design" or "Webdesign" mentioned alongside development, Maintains compelling action-oriented tone, No awkward keyword insertion - flows naturally, Text remains under 3-4 sentences_

## 🟡 PRIORITÄT 2: CONTENT & ASSETS (WOCHE 2-4)

- [x] 10. Generate Open Graph images for all pages
  - Files: public/og-images/ directory with 9 images
  - Action: Create or source 9 OG images (1200x630px, <100KB each) for key pages
  - Purpose: Optimize social media sharing with custom images per page
  - _Leverage: og-image-generator.ts for URL management, design system colors_
  - _Requirements: 6_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Graphic Designer & Web Developer with expertise in OG image optimization | Task: Create or source 9 Open Graph images per Requirement 6 and design.md specifications. Images needed: home.jpg services.jpg web-dev.jpg mobile-dev.jpg design.jpg backend.jpg blog.jpg contact.jpg about.jpg. Each must be 1200x630px <100KB and follow brand guidelines. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Exact dimensions: 1200x630px (strict requirement for OG), File size: <100KB per image (optimize for fast loading), Format: JPG or WebP (better compression), Must include HEADON logo and be brand-consistent | \_Leverage: Design system colors from project (primary secondary accent), docs/seo-optimierung-plan.md (OG image guidelines lines 420-460), Tools: Canva Figma or Vercel OG Image Generation, lib/seo/og-image-generator.ts (for URL integration) | Success: 9 images created and placed in public/og-images/, All images are exactly 1200x630px, File sizes are <100KB (verify with ls -lh), Images include HEADON branding and relevant page context, Safe zone respected (text readable at small sizes), Images validate at opengraph.xyz_

- [x] 11. Create Glossary data structure and listing page
  - Files: lib/content/glossary.ts (NEW), app/glossar/page.tsx (NEW)
  - Action: Build glossary data with 30+ terms and create glossary listing page
  - Purpose: Long-tail keyword target with educational content ("Was ist React?")
  - _Leverage: GlossaryTerm interface from design.md, Next.js SSG_
  - _Requirements: 9_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Technical Writer & Full-Stack Developer with expertise in TypeScript and content architecture | Task: Create glossary system with lib/content/glossary.ts data file (30+ terms) and app/glossar/page.tsx listing page per Requirement 9 and design.md Data Model 2. Focus on technical terms relevant to web/app development that target long-tail search queries. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Minimum 30 terms required (can add more), Each term needs full data: shortDefinition fullExplanation benefits relatedTerms, Keep definitions concise but informative (shortDefinition: 1 sentence), Related terms must reference other glossary IDs | \_Leverage: .spec-workflow/specs/seo-optimization/design.md (Data Model 2), docs/seo-optimierung-plan.md (glossary structure lines 647-683), lib/types/content.ts (add GlossaryTerm interface) | Success: lib/content/glossary.ts contains 30+ well-structured terms, GlossaryTerm interface defined in lib/types/content.ts, app/glossar/page.tsx renders A-Z indexed glossary, Each term shows shortDefinition on listing page, Page uses SSG for optimal performance, Metadata optimized with "Glossar" in title_

- [x] 12. Create Glossary detail pages
  - Files: app/glossar/[term]/page.tsx (NEW), components/content/GlossaryCard.tsx (NEW)
  - Action: Build dynamic routes for individual glossary terms with full content
  - Purpose: Individual pages for each term, optimized for "Was ist [term]?" searches
  - _Leverage: glossary.ts data, generateStaticParams for SSG_
  - _Requirements: 9_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Full-Stack Developer with expertise in Next.js dynamic routes and SEO optimization | Task: Create dynamic glossary term pages at app/glossar/[term]/page.tsx following design.md Component 3 structure. Each term gets its own page with full explanation benefits related terms and resources. Implement generateStaticParams for SSG per Requirement 9. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Must use generateStaticParams for static generation, Do NOT fetch data at runtime - use imported glossary.ts, Related terms must link to other glossary pages, Keep design clean and readable (focus on content) | \_Leverage: lib/content/glossary.ts (glossaryTerms array), lib/seo/meta-builder.ts (generatePageMetadata), .spec-workflow/specs/seo-optimization/design.md (Component 3) | Success: Dynamic route works: /glossar/api /glossar/react etc, All 30+ terms have individual pages via generateStaticParams, Full content renders: fullExplanation benefits relatedTerms resources, Related terms are clickable links to other glossary pages, Metadata includes term name in title: "[Term] - Glossar | HEADON.pro", Pages are statically generated (verify with pnpm build)_

- [x] 13. Create Comparison articles data and pages
  - Files: lib/content/comparisons.ts (NEW), app/vergleiche/page.tsx (NEW), app/vergleiche/[slug]/page.tsx (NEW), components/content/ComparisonTable.tsx (NEW)
  - Action: Build comparison article system with 5+ articles (React vs Vue, Native vs Cross-Platform, etc.)
  - Purpose: High-value content for "X vs Y" search queries, links to service pages
  - _Leverage: ComparisonArticle interface from design.md, ArticleSchema_
  - _Requirements: 9_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Technical Content Strategist & Full-Stack Developer with expertise in comparison content and SEO | Task: Create comparison article system per Requirement 9 and design.md Data Model 3. Build comparisons.ts with 5+ articles (React vs Vue Native vs Cross-Platform Website vs Web-App etc.) listing page dynamic detail pages and ComparisonTable component. These target high-intent "X vs Y" searches. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Minimum 5 comparison articles required, Each comparison must have 2-5 items being compared, Feature tables must be comprehensive (10+ features), Pros/cons must be balanced and honest, Must include CTA to relevant service page | \_Leverage: .spec-workflow/specs/seo-optimization/design.md (Data Model 3 Component 4), docs/seo-optimierung-plan.md (comparison structure lines 686-720), lib/types/content.ts (add ComparisonArticle interface), components/seo/SchemaGenerator.tsx (ArticleSchema for SEO) | Success: lib/content/comparisons.ts contains 5+ comparison articles, ComparisonArticle interface defined in lib/types/content.ts, app/vergleiche/page.tsx lists all comparisons, app/vergleiche/[slug]/page.tsx renders individual articles, ComparisonTable component displays feature comparison, Article schema included on each comparison page, CTA links to relevant service page, All pages use SSG_

- [x] 14. Create Stats Section component for AI SEO
  - File: components/sections/StatsSection.tsx (NEW)
  - Action: Build "About us in numbers" section with structured data for AI search engines
  - Purpose: Provide factual data in structured format for ChatGPT, Perplexity, Bard
  - _Leverage: Framer Motion for count-up animation, Organization schema integration_
  - _Requirements: 12_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Frontend Developer & SEO Specialist with expertise in structured data for AI | Task: Create StatsSection component per Requirement 12 and design.md Component 6. Display key metrics (50+ projects 10+ years 4x faster 100% satisfaction) with count-up animations. Optionally integrate with Organization schema for AI search engines. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Must be client component (uses Framer Motion and intersection observer), Keep animations performant (CSS transforms only), Make stats configurable via props (don't hardcode), Numbers must be real and defensible (not inflated) | \_Leverage: .spec-workflow/specs/seo-optimization/design.md (Component 6), framer-motion for count-up animation, react-intersection-observer for scroll trigger, docs/seo-optimierung-plan.md (stats structure lines 883-923) | Success: Component displays 4+ key stats in grid layout, Numbers animate on scroll into view, Animation triggers only once per page load, Mobile-responsive grid (1 col mobile 2-4 cols desktop), Stats are configurable via props, TypeScript interfaces for Stat type_

## 🟢 PRIORITÄT 3: EXPANSION & LOCAL SEO (WOCHE 4-12)

- [x] 15. Enhance LocalBusiness schema with complete details
  - File: components/seo/StructuredData.tsx
  - Action: Extend existing LocalBusiness schema (lines 58-137) with additional details
  - Purpose: Improve local SEO for "Digitalagentur Lauda-Königshofen" searches
  - _Leverage: Existing LocalBusiness structure, areaServed already includes cities_
  - _Requirements: 8_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Local SEO Specialist & Full-Stack Developer with expertise in Schema.org | Task: Enhance LocalBusiness schema in components/seo/StructuredData.tsx (lines 58-137) per Requirement 8. Add missing fields: description image array email priceRange details. The structure is already good - just add completeness per docs/seo-optimierung-plan.md recommendations. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT restructure existing schema - only add missing fields, Keep existing areaServed array (already includes 6 cities), Ensure all URLs are absolute with baseUrl, Do NOT expose sensitive information (specific addresses if not public) | \_Leverage: components/seo/StructuredData.tsx (existing LocalBusiness lines 58-137), docs/seo-optimierung-plan.md (enhanced LocalBusiness lines 559-630), .spec-workflow/specs/seo-optimization/requirements.md (Requirement 8) | Success: LocalBusiness schema includes description field, Image array includes logo and office/team photos (if available), Email added: info@headon.pro, priceRange set to "€€€" (already present), All existing fields preserved, Schema validates at schema.org validator_

- [x] 16. Setup Blog content strategy and Article schema
  - Files: app/blog/[slug]/page.tsx, lib/content/blog-posts.ts (if needed)
  - Action: Verify Article schema is rendering on blog posts and plan content calendar
  - Purpose: Ensure blog posts have proper structured data for search engines
  - _Leverage: Existing ArticleSchema from SchemaGenerator, blog infrastructure_
  - _Requirements: 10_
  - _Completed: ArticleSchema verified with all required fields (headline, author, datePublished, dateModified, image, publisher). Content calendar created at .spec-workflow/specs/seo-optimization/blog-content-calendar-q1-2025.md with 8 posts (2/month for Q1 2025). All topics target long-tail keywords and featured snippets._
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Content Strategist & SEO Specialist with expertise in blog optimization | Task: Verify blog posts are using ArticleSchema correctly per Requirement 10. Check app/blog/[slug]/page.tsx for schema integration. Create content calendar planning doc (2 posts/month) with topics from docs/seo-optimierung-plan.md. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT write actual blog posts yet - this task is setup and verification, Focus on schema verification and content planning, Ensure Article schema includes all required fields: headline author datePublished image, Content calendar should list topics not full articles | \_Leverage: components/seo/SchemaGenerator.tsx (ArticleSchema wrapper), lib/seo/schema-builder.ts (buildArticleSchema function), docs/seo-optimierung-plan.md (blog content calendar lines 767-806), .spec-workflow/specs/seo-optimization/requirements.md (Requirement 10) | Success: Verified: ArticleSchema renders on all blog posts, Article schema includes headline author datePublished dateModified image, Content calendar document created with Q1 2025 topics (4 posts), Each topic tagged with target keywords, Schema validates in Rich Results Test_

- [x] 17. Enhance portfolio/case studies with detailed schemas
  - Files: app/portfolio/[slug]/page.tsx, components/content/CaseStudyCard.tsx
  - Action: Verify CreativeWork schema is rendering and plan case study enhancements
  - Purpose: Rich portfolio pages with structured data and testimonials
  - _Leverage: Existing CreativeWorkSchema, ReviewSchema for testimonials_
  - _Requirements: 9_
  - _Completed: CreativeWork schema verified rendering correctly with all required fields (name, description, image, dateCreated, keywords, url). ReviewSchema verified with Person schema for testimonial author. Existing case study (SV Viktoria Wertheim) exceeds 1000 words (3900+ words) with excellent Challenge-Solution-Results-Testimonial structure. Enhancement plan documented at .spec-workflow/specs/seo-optimization/portfolio-schema-verification-and-enhancement-plan.md with detailed structure for 4 additional case studies._
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: UX Writer & Full-Stack Developer with expertise in portfolio presentation and Schema.org | Task: Verify portfolio pages use CreativeWork schema correctly per Requirement 9. Plan enhancement of case studies with detailed structure: Challenge Solution Results Testimonial. Add ReviewSchema for testimonials if present. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT rewrite all case studies yet - this is verification and planning, Focus on schema verification and structure planning, If testimonials exist ensure they use ReviewSchema with Person schema, Keep existing portfolio structure intact | \_Leverage: components/seo/SchemaGenerator.tsx (CreativeWorkSchema ReviewSchema), lib/seo/schema-builder.ts (buildCreativeWorkSchema buildReviewSchema), docs/seo-optimierung-plan.md (case study structure lines 724-765), .spec-workflow/specs/seo-optimization/requirements.md (Requirement 9) | Success: Verified: CreativeWork schema renders on portfolio pages, Schema includes name description image dateCreated keywords, Plan documented for enhancing 5 case studies with full structure, If testimonials exist ReviewSchema is implemented, Schema validates in Rich Results Test_

## 📊 VALIDATION & MONITORING

- [ ] 18. Validate all structured data and metadata
  - Files: All pages with schemas and metadata
  - Action: Run comprehensive validation of all schemas and meta tags
  - Purpose: Ensure all SEO implementations are error-free before production
  - _Leverage: Google Rich Results Test, Schema.org validator, metatags.io_
  - _Requirements: All_
  - _Prompt: Implement the task for spec seo-optimization, first run spec-workflow-guide to get the workflow guide then implement the task: Role: QA Engineer & SEO Specialist with expertise in schema validation and testing | Task: Validate all implemented schemas and metadata across all pages. Use Google Rich Results Test schema.org validator and meta tag checkers. Document any errors or warnings. This is final validation before production deployment. Edit tasks.md to mark as [-] when starting and [x] when complete | Restrictions: Do NOT skip any page - validate every page with schemas, Fix critical errors immediately and document warnings, Verify in both dev and production build environments, Check mobile and desktop meta tags | \_Leverage: Google Rich Results Test (https://search.google.com/test/rich-results), Schema.org validator (https://validator.schema.org/), Meta tags validator (https://metatags.io/), Lighthouse SEO audit | Success: All JSON-LD schemas validate without errors, Meta tags are within optimal lengths (title <60 description 150-160), Open Graph tags present and correct on all pages, No critical schema errors in Google Rich Results Test, Lighthouse SEO score 95+ on all tested pages, Validation report documented_

---

## Task Execution Notes

**Priority Execution Order:**

1. ⚡ **P0 Tasks (1-2):** Execute immediately - these are blocking critical issues
2. 🔴 **P1 Tasks (3-9):** Week 1-2 - Foundation for all SEO improvements
3. 🟡 **P2 Tasks (10-14):** Week 2-4 - Content and assets
4. 🟢 **P3 Tasks (15-17):** Week 4-12 - Expansion and enhancement
5. ✅ **Validation (18):** Final validation before production

**Dependencies:**

- Task 5 (FAQAccordion) must complete before Tasks 7-8
- Task 4 (OG Image Generator) must complete before Task 10
- Task 6 (FAQ data) must complete before Tasks 7-8
- Task 11 (Glossary data) must complete before Task 12
- Task 13 (Comparisons) includes all comparison sub-components

**Success Metrics:**

- After P0+P1: 4+ JSON-LD schemas on homepage, all pages have H1 + metadata
- After P2: FAQ page live, OG images present, glossary launched
- After P3: Complete content hub, enhanced local SEO
- After Validation: Zero critical errors, 95+ Lighthouse SEO score

**Time Estimates:**

- P0 Tasks: 1-2 hours total
- P1 Tasks: 1-2 days total
- P2 Tasks: 3-5 days total
- P3 Tasks: 1-2 weeks total (content creation)
- Validation: 2-4 hours
