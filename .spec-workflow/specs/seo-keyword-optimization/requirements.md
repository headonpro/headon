# Requirements Document: SEO & Keyword Optimization

## Introduction

This specification defines a comprehensive SEO and keyword optimization strategy for HEADON.pro to dramatically improve organic search visibility, traffic, and lead generation. The current website has strong technical SEO foundations (Next.js 15, Schema.org, mobile-first design) but misses critical opportunities in keyword targeting, content marketing, and industry-specific landing pages.

**Current Assessment**: 7/10
- ✅ Technical SEO foundation solid
- ❌ Main keywords ("Webdesign Agentur", "Marketing Agentur") missing from titles
- ❌ No industry-specific landing pages (Gastronomie, Handwerk, etc.)
- ❌ Price keywords unutilized
- ❌ Content marketing strategy missing

**Expected Impact**:
- +200-300% organic traffic within 12 months
- +5-10 qualified leads/week from organic search
- Top-3 rankings for 15-20 main keywords

**Timeline**: 6-month phased rollout (60-80 hours total effort)

## Alignment with Product Vision

This SEO initiative directly supports HEADON.pro's business objectives as defined in product.md:

1. **Time-to-Market Reduction**: Improved SEO will drive organic traffic without paid advertising delays
2. **Cost Efficiency**: Organic traffic provides better ROI than paid campaigns
3. **Performance Leadership**: Already have 95+ Lighthouse scores - now optimize for search visibility
4. **Scalability**: Content infrastructure will support future growth and new service offerings

**SEO as a Success Metric** (from product.md):
- Goal: "Top 10 for relevante Agentur-Keywords innerhalb von 6 Monaten"
- This spec provides the concrete implementation plan to achieve that goal

**Product Principles Alignment**:
- **Performance First**: All SEO changes maintain 95+ Lighthouse score
- **Maintainability over Cleverness**: Standard Next.js patterns for metadata, no hacky SEO tricks
- **Production Ready**: Every phase delivers production-ready, tested content

## Requirements

### Requirement 1: Quick Wins - Main Keyword Integration

**User Story**: As a potential client searching for "Webdesign Agentur" or "Marketing Agentur" on Google, I want HEADON.pro to appear in top search results, so that I can discover their services.

#### Acceptance Criteria

1. WHEN the root layout title is updated THEN it SHALL include "Webdesign Agentur" and "Marketing Agentur" in the first 60 characters
2. WHEN the homepage title is updated THEN it SHALL include "Webdesign & Marketing Agentur Lauda-Königshofen"
3. WHEN the homepage description is updated THEN it SHALL include high-value keywords: "Website erstellen lassen", "App Entwicklung", "Festpreise ab 2.500€"
4. WHEN service page titles are optimized THEN each SHALL include primary keyword + "Agentur" pattern (e.g., "Webentwicklung Agentur")
5. WHEN service page descriptions are updated THEN each SHALL include USPs (KI-gestützt, Festpreis, schnell) in first 160 characters
6. WHEN all Quick Wins are deployed THEN Google Search Console SHALL show increased impressions for target keywords within 2-4 weeks
7. WHEN title tags are updated THEN all SHALL remain under 60 characters for full display in SERPs
8. WHEN description tags are updated THEN all SHALL remain between 150-160 characters

**Priority**: CRITICAL (Phase 1 - Week 1-2)
**Effort**: 4-6 hours
**Expected Impact**: +15-20% organic traffic

### Requirement 2: Industry-Specific Landing Pages

**User Story**: As a restaurant owner searching for "Restaurant Website erstellen", I want to find a dedicated page explaining HEADON's gastronomy solutions, so that I can see relevant case studies and pricing.

#### Acceptance Criteria

1. WHEN `/branchen` route is created THEN it SHALL display overview of all 6 industries
2. WHEN a user visits `/branchen/gastronomie` THEN the system SHALL render a dedicated landing page with gastronomy-specific content
3. WHEN each industry page loads THEN it SHALL include:
   - Industry-specific hero section with H1 containing target keywords
   - Feature grid showcasing 4-6 industry-relevant features
   - Pricing section with industry-specific packages (starting from 2.500€)
   - Case studies or testimonials (if available)
   - FAQ section with 5-10 industry-specific questions
   - CTA section with contact form integration
4. WHEN industry pages are created THEN the following 6 industries SHALL be covered:
   - Gastronomie (target: "Restaurant Website", "Online Speisekarte")
   - Handwerk (target: "Handwerker Website", "Online Terminbuchung")
   - Einzelhandel (target: "E-Commerce Website", "Online Shop")
   - Beratung (target: "Website für Berater", "Coaching Website")
   - Immobilien (target: "Immobilien Website", "Makler Homepage")
   - Fitness (target: "Fitness Studio Website", "Kursplan Integration")
5. WHEN industry pages are deployed THEN each SHALL have complete metadata:
   - Title optimized for target keywords (50-60 chars)
   - Description with industry-specific USPs (150-160 chars)
   - Keywords array with 8-12 relevant terms
   - Open Graph images (1200x630) with industry branding
   - Canonical URLs
6. WHEN main navigation is updated THEN it SHALL include "Branchen" menu item
7. WHEN IndustryNavigator component is updated THEN it SHALL link to all 6 industry pages
8. WHEN industry pages are indexed THEN Google Search Console SHALL show impressions for long-tail industry keywords within 4 weeks

**Priority**: HIGH (Phase 2 - Week 3-6)
**Effort**: 12-16 hours (2-3 hours per industry)
**Expected Impact**: +300-500 organic visitors/month

### Requirement 3: Price Transparency Page

**User Story**: As a small business owner researching website costs, I want to find transparent pricing on HEADON.pro, so that I can determine if their services fit my budget before contacting them.

#### Acceptance Criteria

1. WHEN `/preise` route is created THEN it SHALL display comprehensive pricing information
2. WHEN the pricing page loads THEN it SHALL include:
   - Hero section with H1 "Webdesign Preise – Transparent & Fair"
   - Interactive pricing calculator (PriceCalculator component)
   - Pricing table with 3-4 packages (Basis, Professional, Premium)
   - Comparison table (Agentur vs. Baukasten vs. Freelancer)
   - FAQ section (10-15 pricing-related questions)
   - CTA section for individual quote request
3. WHEN PriceCalculator component is implemented THEN users SHALL be able to:
   - Select project type (Website, App, E-Commerce, etc.)
   - Choose complexity level (Simple, Medium, Complex)
   - Add optional features (SEO, Branding, Content, etc.)
   - See real-time price estimate updating
4. WHEN the pricing page metadata is set THEN it SHALL target keywords:
   - Primary: "Webdesign Preise", "Website Kosten"
   - Secondary: "Webdesign Festpreis", "Transparente Preise Webdesign"
5. WHEN the pricing table is created THEN it SHALL show:
   - Package names with clear differentiation
   - Starting prices (from 2.500€)
   - Feature lists with checkmarks
   - "Jetzt anfragen" CTA buttons
6. WHEN comparison table is implemented THEN it SHALL compare:
   - Agentur (HEADON) - pro/contra
   - Website-Baukasten (Wix, Jimdo) - pro/contra
   - Freelancer platforms - pro/contra
7. WHEN pricing page is deployed THEN Google Search Console SHALL show impressions for price-related keywords within 3-4 weeks

**Priority**: HIGH (Phase 3 - Month 2)
**Effort**: 4-6 hours
**Expected Impact**: +100-200 organic visitors/month, improved conversion rate

### Requirement 4: Content Marketing Hub

**User Story**: As a marketing manager researching best practices, I want to find authoritative blog content on HEADON.pro, so that I gain trust in their expertise and consider them for my website project.

#### Acceptance Criteria

1. WHEN 5 high-impact blog posts are created THEN each SHALL target a specific informational keyword:
   - "Website Kosten 2025" (⭐⭐⭐⭐⭐ search volume)
   - "Website erstellen lassen Guide" (⭐⭐⭐⭐)
   - "DSGVO-konforme Website Checkliste" (⭐⭐⭐)
   - "Website Ladezeit optimieren" (⭐⭐⭐)
   - "Website Relaunch Guide" (⭐⭐⭐⭐)
2. WHEN each blog post is written THEN it SHALL include:
   - 2.000-3.000 words of comprehensive content
   - Clear H2/H3 structure with keyword-optimized headings
   - Internal links to relevant service pages and industry pages
   - External links to authoritative sources
   - Featured image (1200x630) with branded design
   - Author information and publish date
   - Estimated reading time
3. WHEN blog posts include metadata THEN each SHALL have:
   - SEO-optimized title (50-60 chars) with target keyword
   - Compelling description (150-160 chars) with CTA
   - Keywords array with primary and semantic keywords
   - Open Graph tags for social sharing
4. WHEN blog content is structured THEN each post SHALL follow:
   - Introduction (problem statement)
   - Main content sections (H2 headings)
   - Practical examples and tips
   - Conclusion with CTA
   - FAQ section (optional but recommended)
5. WHEN blog posts are published THEN they SHALL be:
   - Added to `/blog` overview page
   - Linked from relevant service pages
   - Included in XML sitemap
   - Shared on social media channels
6. WHEN internal linking is implemented THEN:
   - Service pages SHALL link to relevant blog posts
   - Blog posts SHALL link to service pages
   - Industry pages SHALL link to use-case articles
   - Footer SHALL include "Ratgeber" or "Blog" link
7. WHEN blog posts are indexed THEN Google Search Console SHALL show impressions for target keywords within 4-6 weeks

**Priority**: MEDIUM-HIGH (Phase 3 - Month 2-3)
**Effort**: 15-19 hours (3-4 hours per post)
**Expected Impact**: +500-800 organic visitors/month, increased domain authority

### Requirement 5: Local SEO Expansion

**User Story**: As a business owner in Würzburg searching for "Webdesign Agentur Würzburg", I want to find HEADON.pro's location-specific page, so that I can work with a local agency that understands my region.

#### Acceptance Criteria

1. WHEN existing regional pages are reviewed THEN the system SHALL already have:
   - 6 existing Stadt-Seiten (Bad Mergentheim, Lauda-Königshofen, Marktheidenfeld, Tauberbischofsheim, Wertheim, Würzburg)
2. WHEN 4 new regional pages are created THEN they SHALL cover:
   - Heilbronn (larger city, high search volume)
   - Mosbach (regional coverage)
   - Crailsheim (regional coverage)
   - Aschaffenburg (nearby larger city)
3. WHEN each regional page is created THEN it SHALL include:
   - H1 with pattern "Webdesign Agentur [Stadt]"
   - Local hero section with city-specific imagery or references
   - Service overview tailored to local business types
   - Local success stories or case studies (if available)
   - Map integration showing office location + service area
   - Local contact information
   - FAQ with city-specific questions
4. WHEN regional page metadata is set THEN each SHALL target:
   - Primary: "[Service] [Stadt]" patterns
   - Secondary: "[Service] [Region]" patterns
   - Local modifiers: "nähe [Stadt]", "[Stadt] und Umgebung"
5. WHEN Google Business Profile is optimized THEN it SHALL include:
   - All 6 existing locations listed
   - Complete business information (hours, services, phone)
   - High-quality photos (office, team, projects)
   - Regular posts and updates
   - Category: "Webdesign Agentur", "Marketing Agentur"
6. WHEN local citations are created THEN HEADON SHALL be listed on:
   - Gelbe Seiten
   - Das Örtliche
   - GoYellow
   - 11880.com
   - IHK-Firmenverzeichnis
   - Local business directories
7. WHEN local structured data is implemented THEN each regional page SHALL include:
   - LocalBusiness schema with city-specific address
   - Service area definitions
   - Contact point information
   - Geo-coordinates

**Priority**: MEDIUM (Phase 4 - Month 4-5)
**Effort**: 5-7 hours (4 new pages) + 2-3 hours (GBP optimization)
**Expected Impact**: +200-300 local organic visitors/month

### Requirement 6: Content Cluster Strategy

**User Story**: As a technical decision-maker researching web technologies, I want to find in-depth content about Next.js, React, and modern frameworks on HEADON.pro, so that I can evaluate their technical expertise.

#### Acceptance Criteria

1. WHEN content clusters are planned THEN 3 topic pillars SHALL be defined:
   - **Cluster 1**: Webdesign & Entwicklung (10 supporting posts)
   - **Cluster 2**: Branchen-Lösungen (6 supporting posts)
   - **Cluster 3**: SEO & Marketing (5 supporting posts)
2. WHEN Cluster 1 (Webdesign) content is created THEN it SHALL include blog posts on:
   - "Responsive Webdesign: Der komplette Guide 2025"
   - "Progressive Web Apps (PWA): Was ist das?"
   - "Next.js vs. WordPress: Was ist besser für Ihre Website?"
   - "Headless CMS: Vorteile & Nachteile"
   - "Website-Typen: Landing Page vs. One-Pager vs. Corporate Website"
   - "Mobile-First Design: Warum es 2025 Pflicht ist"
   - "Website-Performance optimieren: Technischer Guide"
   - "SSL-Zertifikat: Warum HTTPS wichtig ist"
   - "Website-Wartung: Was gehört dazu?"
   - "Content Management Systeme im Vergleich"
3. WHEN Cluster 2 (Branchen) content is created THEN it SHALL include:
   - "Best Practices für Restaurant-Websites"
   - "E-Commerce für lokale Einzelhändler: Lohnt sich das?"
   - "Handwerker-Website: 10 Must-Have Features"
   - "Website für Coaches & Berater: Lead-Generierung-Tipps"
   - "Immobilien-Website: So präsentieren Sie Objekte optimal"
   - "Fitness-Studio Website: Online-Kursbuchung integrieren"
4. WHEN Cluster 3 (SEO & Marketing) content is created THEN it SHALL include:
   - "Lokale SEO: So werden Sie bei Google gefunden"
   - "Google Business Profile optimieren: Schritt-für-Schritt"
   - "Website-Texte schreiben: SEO-optimiert & nutzerfreundlich"
   - "Backlinks aufbauen: Strategien für lokale Unternehmen"
   - "Google Analytics einrichten: Guide für Einsteiger"
5. WHEN internal linking strategy is implemented THEN:
   - Pillar pages (service pages) SHALL link to all supporting posts
   - Supporting posts SHALL link back to pillar page
   - Related posts SHALL cross-link within cluster
   - Anchor text SHALL use semantic keyword variations
6. WHEN content clusters are complete THEN Google Search Console SHALL show:
   - Increased impressions for cluster keywords
   - Improved average position for topic-related searches
   - Higher click-through rates from better content relevance

**Priority**: MEDIUM (Phase 4 - Month 4-6)
**Effort**: 30-40 hours (21 blog posts × 1.5-2 hours each)
**Expected Impact**: +1.000+ organic visitors/month, improved topical authority

### Requirement 7: Technology Pages for Niche Traffic

**User Story**: As a technical founder researching Next.js agencies, I want to find HEADON's dedicated Next.js expertise page, so that I can evaluate their technical capabilities.

#### Acceptance Criteria

1. WHEN `/technologie` route structure is created THEN it SHALL support individual technology pages
2. WHEN technology pages are created THEN the following 6 SHALL be implemented:
   - Next.js Agentur
   - React Entwicklung
   - TypeScript Entwicklung
   - Supabase Backend
   - Headless CMS
   - Tailwind CSS
3. WHEN each technology page is implemented THEN it SHALL include:
   - Technology overview and explanation
   - Benefits and use cases
   - Case studies using this technology
   - Technical comparison with alternatives
   - When to choose this technology
   - FAQ section
   - CTA for technical consultation
4. WHEN technology page metadata is set THEN it SHALL target:
   - Primary: "[Technology] Agentur", "[Technology] Entwicklung"
   - Secondary: "[Technology] Expertise", "Professionelle [Technology] Services"
5. WHEN technology pages link to portfolio THEN they SHALL:
   - Highlight projects built with this technology
   - Show technology stack badges
   - Link to GitHub repos (if open-source)
6. WHEN technology pages are indexed THEN Google Search Console SHALL show:
   - Impressions for niche technical keywords
   - Traffic from technically-savvy decision-makers

**Priority**: LOW-MEDIUM (Phase 5 - Month 7-12)
**Effort**: 12-18 hours (6 pages × 2-3 hours each)
**Expected Impact**: +200-300 highly qualified visitors/month

### Requirement 8: Continuous Optimization & Monitoring

**User Story**: As the HEADON marketing team, I want to monitor SEO performance metrics weekly, so that I can identify issues early and optimize underperforming content.

#### Acceptance Criteria

1. WHEN baseline metrics are established THEN the following SHALL be documented:
   - Total impressions (last 28 days) from Google Search Console
   - Total clicks (last 28 days)
   - Average CTR
   - Average position
   - Top-10 keywords with current rankings
   - Organic traffic from Google Analytics
   - Bounce rate and session duration
   - Conversion rate (contact form submissions)
2. WHEN weekly monitoring is performed THEN the team SHALL review:
   - Impressions change (week-over-week)
   - Clicks change
   - CTR change
   - New keywords entering Top-100
   - Ranking changes for target keywords
3. WHEN monthly reports are generated THEN they SHALL include:
   - Organic traffic trend (+/- % vs. previous month)
   - Top-10 keywords table (keyword, position, change, impressions, clicks)
   - New rankings in Top-100
   - New pages with traffic
   - Next month's action items
4. WHEN quarterly reviews are conducted THEN they SHALL analyze:
   - Comparison with baseline metrics
   - ROI calculation (traffic value vs. time invested)
   - Content gap analysis (new keyword opportunities)
   - Competitor analysis (rankings comparison)
   - Backlink development
   - Technical SEO audits
5. WHEN 12-month goals are set THEN they SHALL target:
   - +200-300% organic traffic (vs. baseline)
   - 3.000-5.000 organic visitors/month
   - Top-3 rankings for 15-20 main keywords
   - Top-10 rankings for 50+ long-tail keywords
   - Top-100 rankings for 200+ keywords
   - 5-10 qualified leads/week from organic search
   - Conversion rate >2% for organic traffic
   - Domain Rating (Ahrefs) >30
   - 100+ quality backlinks
6. WHEN A/B testing is performed THEN the team SHALL test:
   - Different title tag variations
   - Description tag CTR optimization
   - H1 heading variations
   - CTA button copy and placement
7. WHEN content updates are scheduled THEN:
   - Existing content SHALL be reviewed every 6 months
   - Outdated information SHALL be updated
   - New sections SHALL be added based on user questions
   - Images SHALL be refreshed or optimized

**Priority**: ONGOING (All Phases)
**Effort**: 2-3 hours/week for monitoring, 4-6 hours/quarter for reviews
**Expected Impact**: Maintains and improves SEO gains over time

## Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Each page/component serves one SEO purpose
  - Industry pages focus solely on that industry
  - Blog posts focus on one topic/keyword
  - Technology pages showcase one tech stack
- **Modular Design**: Reusable components for SEO elements
  - `BrancheContent.tsx` for industry pages
  - `BlogPost.tsx` for article layout
  - `PricingCalculator.tsx` for pricing page
  - `SEOPageHeader.tsx` for consistent page headers
- **Dependency Management**:
  - No new external dependencies required
  - Leverage existing Next.js Metadata API
  - Use existing UI components from shadcn/ui
- **Clear Interfaces**:
  - Metadata interfaces for consistent SEO tags
  - Content schemas for blog posts and landing pages
  - Frontmatter types for MDX content

### Performance

- **Page Load Time**: All new pages MUST achieve <1.5s LCP
- **Lighthouse Score**: Maintain 95+ across all categories
- **Core Web Vitals**:
  - LCP <1.5s
  - FID <100ms
  - CLS <0.1
- **Bundle Size**: No single page SHALL increase JS bundle by >50KB
- **Image Optimization**: All images use Next.js Image component with proper sizing
- **Code Splitting**: Each route loads only necessary code

### Security

- **Input Validation**: All form inputs validated with Zod schemas
- **XSS Prevention**: User-generated content (comments, if added) properly sanitized
- **Content Security**: No inline scripts, proper CSP headers maintained
- **API Security**: Contact form API maintains rate limiting
- **Environment Variables**: No sensitive data in metadata or content

### Reliability

- **Build Stability**: All metadata changes MUST pass Next.js build without errors
- **Backward Compatibility**: Existing routes remain functional during SEO updates
- **404 Handling**: New routes properly registered, no broken links
- **Sitemap Updates**: XML sitemap automatically includes new pages
- **Robots.txt**: Properly configured to allow/disallow appropriate paths

### Usability

- **Mobile-First**: All new content fully responsive and mobile-optimized
- **Accessibility**: WCAG 2.1 Level AA compliance maintained
  - Proper heading hierarchy (H1 → H2 → H3)
  - Alt tags on all images
  - Semantic HTML
  - Keyboard navigation support
- **Readability**: Content written at 8th-10th grade reading level
- **Navigation**: Clear breadcrumbs and internal linking
- **CTA Clarity**: Every page has clear next action for users

### Maintainability

- **Content Updates**: Blog posts and landing pages easily editable
- **Metadata Management**: Centralized metadata patterns
- **Documentation**: Each phase documented with before/after examples
- **Version Control**: All content changes tracked in Git
- **Rollback Safety**: Ability to revert any SEO change if traffic drops

## Success Criteria

### Phase 1 Success (Week 2)
- ✅ All Quick Win metadata changes deployed
- ✅ Google Search Console shows indexing of updated pages
- ✅ Baseline metrics documented for comparison

### Phase 2 Success (Week 6)
- ✅ 6 industry landing pages live and indexed
- ✅ IndustryNavigator updated with links
- ✅ Google Search Console shows impressions for long-tail industry keywords

### Phase 3 Success (Month 3)
- ✅ Pricing page live with interactive calculator
- ✅ 5 high-impact blog posts published
- ✅ +20-30% organic traffic increase vs. baseline

### Phase 4 Success (Month 6)
- ✅ 21+ supporting blog posts published (content clusters)
- ✅ 4 new regional pages live
- ✅ +100-150% organic traffic increase vs. baseline

### Phase 5 Success (Month 12)
- ✅ 6 technology pages live
- ✅ +200-300% organic traffic increase vs. baseline
- ✅ Top-3 rankings for 15-20 main keywords
- ✅ 5-10 qualified leads/week from organic search

## Technical Constraints

1. **No Breaking Changes**: SEO updates MUST NOT break existing functionality
2. **Build Time**: Total build time SHALL remain under 60 seconds
3. **Zero New Dependencies**: Use existing Next.js, React, TypeScript stack
4. **Server Rendering**: Metadata MUST be server-rendered for crawlers
5. **Static Generation**: Blog posts and landing pages SHOULD use SSG where possible
6. **URL Structure**: Keep URLs clean, descriptive, and permanent (no future changes)

## Content Standards

1. **Keyword Density**: 1-2% natural integration (no keyword stuffing)
2. **Title Length**: 50-60 characters (full display in SERPs)
3. **Description Length**: 150-160 characters (with CTA)
4. **Heading Hierarchy**: Proper H1 → H2 → H3 structure (one H1 per page)
5. **Internal Links**: 3-5 relevant internal links per page
6. **External Links**: 1-2 authoritative external sources per blog post
7. **Image Alt Tags**: Descriptive alt text with keywords (where natural)
8. **Content Quality**: Original, valuable content (no duplicate or thin content)

## Legal & Compliance

1. **DSGVO**: All content respects data privacy regulations
2. **Copyright**: All images and content properly licensed or created
3. **Accessibility**: WCAG 2.1 Level AA compliance
4. **Transparency**: Pricing information accurate and up-to-date
5. **Contact Information**: Correct impressum and contact details

---

**Document Version**: 1.0
**Created**: 2025-10-27
**Status**: Ready for Review
**Next Phase**: Design Document (after approval)
