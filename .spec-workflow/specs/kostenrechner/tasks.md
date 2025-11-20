# Tasks Document: Kostenrechner

## Phase 1: Foundation & Type System

- [x] 1.1. Create TypeScript types and interfaces
  - Files: `lib/calculator/types.ts`
  - Define all TypeScript interfaces for Calculator State, Comparison Result, Provider Estimate
  - Export all types for use in components
  - Purpose: Establish type safety foundation
  - _Leverage: Existing type patterns from `lib/content/frontmatter.ts`_
  - _Requirements: All requirements (foundational)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer specializing in type systems | Task: Create comprehensive TypeScript interfaces in lib/calculator/types.ts following the design document's "Data Models" section, including CalculatorState, ComparisonResult, ProviderEstimate, PriceRange, DurationRange, BreakdownItem, and LeadData interfaces | Restrictions: Use strict TypeScript types, follow PascalCase naming for interfaces, use type unions for enums | Success: All interfaces compile without errors, types are exported and importable, follows project TypeScript strict mode standards | Instructions: After implementing, mark this task as in-progress in tasks.md by changing [ ] to [-], then after completion log implementation with log-implementation tool including artifacts (all interfaces created), then mark as complete [x]_

- [x] 1.2. Create pricing configuration
  - Files: `lib/calculator/pricing-config.ts`
  - Define all base prices, multipliers, feature costs, quality costs
  - Export configuration objects and helper functions
  - Purpose: Centralize all pricing data
  - _Leverage: Pattern from `lib/content/glossary.ts` for data structures_
  - _Requirements: Requirements 2-6 (all pricing rules)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Backend Developer with pricing system expertise | Task: Create pricing-config.ts with all base prices, multipliers, and cost definitions from design document's "Pricing-Logik" section in feature plan, including getBasePrice(), getDesignMultiplier(), getFeatureCost(), getQualityCost() helper functions | Restrictions: Use SCREAMING_SNAKE_CASE for constant exports, return PriceRange objects (min/max/avg), ensure all multipliers are numbers | Success: All pricing data is defined, helper functions return correct types, configuration is importable and type-safe | Instructions: Set task to in-progress [-], implement, log with log-implementation tool (artifacts: pricing configuration objects and helper functions), mark complete [x]_

- [x] 1.3. Create Zod validation schemas
  - Files: `lib/calculator/validation-schemas.ts`
  - Create schemas for CalculatorState, LeadCapture, API Request
  - Export schemas and inferred types
  - Purpose: Runtime validation for forms and API
  - _Leverage: Existing patterns from `lib/validations.ts` and `lib/content/frontmatter.ts`_
  - _Requirements: Requirements 9, 11 (validation requirements)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer with Zod validation expertise | Task: Create validation-schemas.ts with Zod schemas for calculatorStateSchema, leadCaptureSchema, and calculatorAPISchema as defined in design document's "Zod Validation Schemas" section, following patterns from lib/validations.ts | Restrictions: Use German error messages, make optional fields .optional(), use .refine() for custom validation | Success: All schemas validate correctly, type inference works (z.infer), error messages are clear in German | Instructions: Mark in-progress [-], implement schemas, log implementation with artifacts (Zod schemas created), mark complete [x]_

- [x] 1.4. Create calculator engine
  - Files: `lib/calculator/calculator-engine.ts`
  - Implement calculateComparison(), calculateHeadonPrice(), calculateFreelancerPrice(), calculateAgencyPrice()
  - Add calculateDuration(), calculateBreakdown() functions
  - Purpose: Core calculation logic
  - _Leverage: Pure function patterns, TypeScript types from 1.1_
  - _Requirements: Requirements 2-8 (all calculation rules)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Backend Developer with algorithm design expertise | Task: Implement calculator-engine.ts with all calculation functions as specified in design document's "Berechnungs-Formel" section, using pricing-config.ts and types.ts, implement calculateComparison() as main export that returns ComparisonResult | Restrictions: All functions must be pure (no side effects), handle edge cases gracefully, use pricing-config constants | Success: All calculation functions return correct types, math is accurate per spec, edge cases handled with fallbacks | Instructions: Set to in-progress [-], implement calculation logic, log with log-implementation tool (artifacts: calculation functions), mark complete [x]_

- [x] 1.5. Create utility helper functions
  - Files: `lib/calculator/utils.ts`
  - Implement formatCurrency(), formatDuration(), calculateTotal() helpers
  - Export utility functions
  - Purpose: Reusable formatting helpers
  - _Leverage: Pattern from `@/lib/utils.ts`_
  - _Requirements: All (formatting needs)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Frontend Developer with i18n/formatting expertise | Task: Create utils.ts with formatCurrency(number) returning German-formatted Euro string (12500 → "12.500€"), formatDuration(DurationRange) returning German week range ("6-8 Wochen"), and calculateTotal(BreakdownItem[]) summing values | Restrictions: Use German number formatting (. as thousands separator), handle null/undefined gracefully, return empty strings for invalid inputs | Success: All formatters return correct German strings, functions are type-safe, edge cases handled | Instructions: Mark in-progress [-], implement formatters, log implementation with artifacts (utility functions), mark complete [x]_

## Phase 2: Shared UI Components

- [x] 2.1. Install required shadcn/ui components
  - Files: New shadcn components via CLI
  - Run: `pnpm dlx shadcn@latest add checkbox radio-group slider progress switch tooltip`
  - Purpose: Add missing UI primitives
  - _Leverage: Existing `components.json` configuration_
  - _Requirements: Design requirements for UI components_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Frontend Developer familiar with shadcn/ui | Task: Install shadcn/ui components using pnpm dlx shadcn@latest add for: checkbox, radio-group, slider, progress, switch, tooltip - run these commands in sequence and verify each installs to components/ui/ | Restrictions: Do not modify components after installation, verify components.json is unchanged, ensure Tailwind config includes components | Success: All 6 components installed in components/ui/, imports work correctly, components render without errors | Instructions: Mark in-progress [-], run install commands, log with log-implementation tool (artifacts: UI components added, list all installed), mark complete [x]_

- [x] 2.2. Create ProjectTypeCard component
  - Files: `components/calculator/shared/ProjectTypeCard.tsx`
  - Implement icon card with selection state, hover effects, price display
  - Export component with TypeScript props interface
  - Purpose: Reusable project type selector
  - _Leverage: Framer Motion patterns from `app/contact/MultiStepForm.tsx`, Lucide icons_
  - _Requirements: Requirement 2 (Step 1 - Projekttyp)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with Framer Motion expertise | Task: Create ProjectTypeCard.tsx component per design document's "14. ProjectTypeCard.tsx" section, implement with ProjectTypeCardProps interface, use motion.div with whileHover/whileTap, show Lucide icon, label, description, optional basePrice, selected state with CheckCircle2 icon | Restrictions: Must be client component ('use client'), use cn() from lib/utils, follow design's className patterns, handle onClick prop | Success: Component renders correctly, animations smooth, selected state visible, props type-safe | Instructions: Mark in-progress [-], create component, log with log-implementation tool (artifacts: React component created with props interface), mark complete [x]_

- [x] 2.3. Create FeatureCheckbox component
  - Files: `components/calculator/shared/FeatureCheckbox.tsx`
  - Implement checkbox with price badge, icon, description
  - Handle checked state and onChange
  - Purpose: Feature selection with pricing
  - _Leverage: Checkbox from shadcn/ui, Badge component_
  - _Requirements: Requirement 4 (Step 3 - Funktionalitäten)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with form component expertise | Task: Create FeatureCheckbox.tsx per design document's "15. FeatureCheckbox.tsx" section, implement FeatureCheckboxProps with label, description, checked, onChange, price, icon props, use shadcn Checkbox and Badge components, show price as badge on right | Restrictions: Make entire div clickable, use cn() for conditional styling, handle both number and PriceRange for price prop | Success: Component toggles on click, badge shows formatted price, icon displays correctly, type-safe props | Instructions: Set in-progress [-], implement component, log with log-implementation (artifacts: component with props interface), mark complete [x]_

- [x] 2.4. Create RangeSlider component
  - Files: `components/calculator/shared/RangeSlider.tsx`
  - Implement custom slider with labels and current value display
  - Use shadcn Slider component
  - Purpose: Page count selection with visual feedback
  - _Leverage: Slider from shadcn/ui_
  - _Requirements: Requirement 3 (Step 2 - Design & Umfang)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with custom form controls expertise | Task: Create RangeSlider.tsx per design document's "16. RangeSlider.tsx" section, implement RangeSliderProps with value, onChange, min, max, step, optional labels and formatLabel, use shadcn Slider, display labels above slider, show formatted current value prominently below | Restrictions: Value must be controlled prop, use onValueChange from Slider correctly, highlight active label with text-primary-600 | Success: Slider updates on drag, labels display correctly, current value formatted and visible, type-safe | Instructions: Mark in-progress [-], create component, log implementation (artifacts: slider component), mark complete [x]_

- [x] 2.5. Create PriceCounter component
  - Files: `components/calculator/shared/PriceCounter.tsx`
  - Implement animated number counter for price updates
  - Show price range below main price
  - Purpose: Animated live price display
  - _Leverage: Framer Motion or useEffect with setInterval_
  - _Requirements: Requirement 7 (Live Price Preview)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with animation expertise | Task: Create PriceCounter.tsx per design document's "17. PriceCounter.tsx" section, implement animated number counting using useEffect + useState + setInterval (animate from previous to new value over 1 second), format with formatCurrency(), show min-max range below if provided | Restrictions: Clean up interval on unmount, debounce rapid changes, use text-4xl font-bold text-primary-600 for main price | Success: Numbers animate smoothly when value changes, formatting correct, no memory leaks, range displays when provided | Instructions: Set in-progress [-], implement animation logic, log with log-implementation (artifacts: animated component), mark complete [x]_

- [x] 2.6. Create shared components index
  - Files: `components/calculator/shared/index.ts`
  - Export all shared components as barrel export
  - Purpose: Clean imports for step components
  - _Leverage: Barrel export pattern_
  - _Requirements: All (code organization)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer | Task: Create index.ts barrel export in components/calculator/shared/ that exports ProjectTypeCard, FeatureCheckbox, RangeSlider, PriceCounter using named exports | Restrictions: Use export { ComponentName } from './ComponentName' syntax, maintain alphabetical order | Success: All shared components importable from single path, no circular dependencies | Instructions: Mark in-progress [-], create index file, log implementation (artifacts: barrel export file), mark complete [x]_

## Phase 3: Core Container Components

- [x] 3.1. Create CalculatorProgress component
  - Files: `components/calculator/CalculatorProgress.tsx`
  - Implement progress bar with step indicators (1/6, 2/6, ...)
  - Add step labels and clickable navigation
  - Purpose: Visual progress and navigation
  - _Leverage: Progress bar pattern from `app/contact/MultiStepForm.tsx`, Framer Motion_
  - _Requirements: Requirement 1 (Multi-Step Calculator Flow)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with multi-step form expertise | Task: Create CalculatorProgress.tsx per design document's "2. CalculatorProgress.tsx" section, implement CalculatorProgressProps with currentStep, totalSteps, onStepClick, allowBackNavigation, use motion.div for step circles, CheckCircle2 icon for completed steps, connector lines with animated fill | Restrictions: Must be client component, use AnimatePresence for step label transitions, only allow back navigation if allowBackNavigation=true | Success: Progress displays correctly, animations smooth, click navigation works, step labels update | Instructions: Set in-progress [-], create component, log with log-implementation (artifacts: progress component with animations), mark complete [x]_

- [x] 3.2. Create PricePreview component
  - Files: `components/calculator/PricePreview.tsx`
  - Implement sticky sidebar with live price, duration, breakdown
  - Use PriceCounter for animated price
  - Purpose: Real-time cost preview
  - _Leverage: PriceCounter component (2.5), Calculator Engine (1.4)_
  - _Requirements: Requirement 7 (Live Price Preview Sidebar)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with layout expertise | Task: Create PricePreview.tsx per design document's "3. PricePreview.tsx" section, implement PricePreviewProps with state and className, use useMemo to call calculateHeadonEstimate(state) and calculateBreakdown(state), display PriceCounter, duration with Clock icon, breakdown list with labels/values | Restrictions: Must use sticky top-24 positioning, use Card from shadcn/ui, memoize calculations to prevent unnecessary recalculations | Success: Preview updates when state changes, sticky positioning works, breakdown displays correctly, performant | Instructions: Mark in-progress [-], implement with useMemo, log implementation (artifacts: preview component with memoization), mark complete [x]_

- [x] 3.3. Create CostCalculator main container
  - Files: `components/calculator/CostCalculator.tsx`
  - Implement main state container with useState for CalculatorState
  - Add step navigation (handleNext/handlePrev)
  - Render CalculatorProgress, current step component, PricePreview
  - Purpose: Central state and orchestration
  - _Leverage: State management pattern from `app/contact/MultiStepForm.tsx`_
  - _Requirements: Requirements 1-8 (all calculator flow)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Senior React Developer with state management expertise | Task: Create CostCalculator.tsx per design document's "1. CostCalculator.tsx" section, implement CalculatorState with useState, create defaultCalculatorState, handleNext/handlePrev functions, calculate comparison on step 6 with useEffect, use AnimatePresence for step transitions | Restrictions: Must be client component, use useMemo for currentStepComponent, ensure state doesn't reset on re-renders, handle currentStep between 1-6 | Success: State management robust, step navigation works, preview updates reactively, step 6 shows comparison | Instructions: Set in-progress [-], implement state container, log with log-implementation (artifacts: main container component with state management), mark complete [x]_

## Phase 4: Step Components

- [x] 4.1. Create StepProjectType component
  - Files: `components/calculator/steps/StepProjectType.tsx`
  - Implement project type selection with ProjectTypeCard
  - Map through 6-7 project types with icons
  - Purpose: Step 1 - Project type selection
  - _Leverage: ProjectTypeCard (2.2)_
  - _Requirements: Requirement 2 (Step 1 - Projekttyp)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer | Task: Create StepProjectType.tsx per design document's "4. StepProjectType.tsx" section, implement StepProjectTypeProps with value and onChange, create projectTypes array with 6 options (website-simple, website-complex, web-app, mobile-app, ecommerce, custom) each with icon, label, description, basePrice, map through with ProjectTypeCard in grid gap-4 md:grid-cols-2 | Restrictions: Use Globe, Zap, Smartphone, ShoppingCart, Target icons from Lucide, stagger animations with delay: index * 0.1 | Success: All project types render, selection works, animations stagger correctly, base prices display | Instructions: Mark in-progress [-], implement step, log with log-implementation (artifacts: step component with project type data), mark complete [x]_

- [x] 4.2. Create StepDesignScope component
  - Files: `components/calculator/steps/StepDesignScope.tsx`
  - Implement design level (RadioGroup), page range (RangeSlider), responsiveness (Select), UX complexity (RadioGroup)
  - Handle state updates for all 4 fields
  - Purpose: Step 2 - Design configuration
  - _Leverage: RangeSlider (2.4), RadioGroup, Select from shadcn/ui_
  - _Requirements: Requirement 3 (Step 2 - Design & Umfang)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with form expertise | Task: Create StepDesignScope.tsx per design document's "5. StepDesignScope.tsx" section, implement StepDesignScopeProps with designLevel, pageRange, responsiveness, uxComplexity and onChange, create 4 sections: design level radio cards (template 1.0x, custom 1.5x, premium 2.0x), RangeSlider for pages (1-5, 6-15, 16-30, 30+), Select for responsiveness, RadioGroup for UX | Restrictions: Pass partial state updates to onChange, show multipliers in labels (e.g. "Premium (2.0x)"), use clear German labels | Success: All 4 fields render and update state, RangeSlider shows page range, multipliers clear, responsive layout | Instructions: Set in-progress [-], implement multi-field step, log implementation (artifacts: complex step component), mark complete [x]_

- [x] 4.3. Create StepFeatures component
  - Files: `components/calculator/steps/StepFeatures.tsx`
  - Implement 10+ feature checkboxes with conditional sub-options
  - Use AnimatePresence for expanding sub-options
  - Purpose: Step 3 - Feature selection
  - _Leverage: FeatureCheckbox (2.3), RadioGroup, AnimatePresence_
  - _Requirements: Requirement 4 (Step 3 - Funktionalitäten)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with complex form state expertise | Task: Create StepFeatures.tsx per design document's "6. StepFeatures.tsx" section, implement StepFeaturesProps with features object and onChange, create FeatureCheckbox for each feature (cms, auth, database, payment, api, thirdPartyIntegrations, fileUploads, i18n, adminDashboard, realtime), add AnimatePresence conditional sub-options for cms (cmsType), auth (2FA, Social), database (complexity), payment (provider), api (type), i18n (languages count) | Restrictions: Use ml-8 for indented sub-options, animate with initial/animate/exit height and opacity, handle nested state updates correctly | Success: All features toggle, sub-options appear/disappear smoothly, state updates correctly, price badges show | Instructions: Mark in-progress [-], implement with conditional rendering, log with log-implementation (artifacts: complex feature component with conditional logic), mark complete [x]_

- [x] 4.4. Create StepQuality component
  - Files: `components/calculator/steps/StepQuality.tsx`
  - Implement quality options with Accordion (6 categories)
  - SEO, Performance, Security, DSGVO, Testing, Accessibility
  - Purpose: Step 4 - Quality requirements
  - _Leverage: Accordion, RadioGroup from shadcn/ui_
  - _Requirements: Requirement 5 (Step 4 - Qualität & Performance)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer | Task: Create StepQuality.tsx per design document's "7. StepQuality.tsx" section, implement StepQualityProps with quality object and onChange, create Accordion with 6 AccordionItems (seo, performance, security, dsgvo, testing, accessibility), each with RadioGroup for levels (none/basic/advanced/enterprise or similar), show prices in labels, use icons (Search, Zap, Shield, Lock, TestTube, Eye) | Restrictions: Use type="multiple" for Accordion to allow multiple open, include descriptions in small text for each level, handle checkbox for DSGVO separately | Success: All 6 accordions work, radio selections update state, prices visible, descriptions helpful | Instructions: Set in-progress [-], implement accordion structure, log with log-implementation (artifacts: quality step with accordion UI), mark complete [x]_

- [x] 4.5. Create StepTimeline component
  - Files: `components/calculator/steps/StepTimeline.tsx`
  - Implement timeline options: project start, maintenance, support, hosting, training
  - Mix of RadioGroup, Select, Switch, Checkbox
  - Purpose: Step 5 - Timeline configuration
  - _Leverage: RadioGroup, Select, Switch from shadcn/ui_
  - _Requirements: Requirement 6 (Step 5 - Timeline & Support)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer | Task: Create StepTimeline.tsx per design document's "8. StepTimeline.tsx" section, implement StepTimelineProps with timeline object and onChange, create 5 sections: project start radio cards (flexible, normal, urgent with 1.3x), maintenance radio cards (none, basic +150€/mo, premium +350€/mo), support Select (none, 3/6/12 months with one-time costs), hosting Switch (+50€/mo), training Checkbox (+800€) | Restrictions: Show monthly costs separately from one-time, use icons (Zap, Calendar, Clock, Target) for timeline options, indicate urgent with red/orange color | Success: All 5 fields update state, monthly vs one-time costs clear, urgent multiplier indicated visually | Instructions: Mark in-progress [-], create timeline step, log implementation (artifacts: timeline component with mixed input types), mark complete [x]_

- [x] 4.6. Create steps index barrel export
  - Files: `components/calculator/steps/index.ts`
  - Export all 5 step components
  - Purpose: Clean imports
  - _Leverage: Barrel export pattern_
  - _Requirements: All (code organization)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer | Task: Create index.ts in components/calculator/steps/ that exports StepProjectType, StepDesignScope, StepFeatures, StepQuality, StepTimeline using named exports | Restrictions: Alphabetical order, named exports only | Success: All steps importable from single path | Instructions: Set in-progress [-], create barrel export, log with log-implementation (artifacts: barrel export), mark complete [x]_

## Phase 5: Results Components

- [x] 5.1. Create ComparisonCard component
  - Files: `components/calculator/results/ComparisonCard.tsx`
  - Implement provider card with price, duration, quality stars, pros/cons
  - Handle highlight prop for HEADON card
  - Purpose: Single provider comparison display
  - _Leverage: Card, Separator from shadcn/ui, Lucide icons_
  - _Requirements: Requirement 8 (Step 6 - 3-Way Comparison)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer | Task: Create ComparisonCard.tsx per design document's "10. ComparisonCard.tsx" section, implement ComparisonCardProps with provider (ProviderEstimate) and highlight boolean, display price with formatCurrency (large text-3xl), duration with Clock icon, quality as 5 Star icons (filled based on quality number), pros with Check icon (green), cons with AlertCircle icon (orange), absolute positioned "BESTE WAHL" badge if highlighted | Restrictions: Use border-primary-600 border-2 for highlighted card, capitalize provider name, map through pros/cons arrays | Success: Card displays all info correctly, highlight styling prominent, stars render based on quality, pros/cons visible | Instructions: Mark in-progress [-], implement card, log with log-implementation (artifacts: comparison card component), mark complete [x]_

- [x] 5.2. Create ComparisonGrid component
  - Files: `components/calculator/results/ComparisonGrid.tsx`
  - Implement responsive grid (3 columns desktop) / Tabs (mobile)
  - Render 3 ComparisonCards
  - Purpose: Comparison layout
  - _Leverage: ComparisonCard (5.1), Tabs from shadcn/ui_
  - _Requirements: Requirement 8 (Step 6)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with responsive design expertise | Task: Create ComparisonGrid.tsx per design document's "9. ComparisonGrid.tsx" section, implement ComparisonGridProps with comparison and isMobile props, render grid gap-6 md:grid-cols-3 on desktop with 3 ComparisonCards, render Tabs with TabsList (3 triggers) and TabsContent on mobile, pass highlight=true to HEADON card | Restrictions: Detect mobile with window.innerWidth or CSS breakpoint, ensure tabs swipeable on touch devices | Success: Desktop shows 3-column grid, mobile shows tabs, HEADON card highlighted, responsive switch works | Instructions: Set in-progress [-], implement responsive layout, log with log-implementation (artifacts: grid component with responsive logic), mark complete [x]_

- [x] 5.3. Create SavingsHighlight component
  - Files: `components/calculator/results/SavingsHighlight.tsx`
  - Implement savings badge with animated appearance
  - Show price and time savings vs agency
  - Purpose: Highlight value proposition
  - _Leverage: Framer Motion, formatCurrency_
  - _Requirements: Requirement 8 (Savings Highlight)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer | Task: Create SavingsHighlight.tsx per design document's "11. SavingsHighlight.tsx" section, implement SavingsHighlightProps with savings object, calculate totalSavingsVsAgency and timeSavingsVsAgency from savings.vsAgency, display with motion.div initial scale 0.9 animate to 1, use gradient background from-green-50 to-emerald-50, show 💰 emoji, large formatted price savings and week savings | Restrictions: Use text-4xl for emoji, text-2xl font-bold for heading, text-3xl font-extrabold text-green-700 for numbers | Success: Component animates on mount, savings calculated correctly, visually prominent, formatting correct | Instructions: Mark in-progress [-], create savings component, log implementation (artifacts: animated savings badge), mark complete [x]_

- [x] 5.4. Create PriceBreakdown component
  - Files: `components/calculator/results/PriceBreakdown.tsx`
  - Implement expandable accordion with categorized costs
  - Calculate breakdown from state using calculator engine
  - Purpose: Detailed cost transparency
  - _Leverage: Accordion from shadcn/ui, Calculator Engine_
  - _Requirements: Requirement 8 (Detailed Breakdown)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer | Task: Create PriceBreakdown.tsx per design document's "12. PriceBreakdown.tsx" section, implement PriceBreakdownProps with state and breakdown array, create Accordion with AccordionItem showing Calculator icon and "Detaillierte Aufschlüsselung", map through breakdown categories showing category name, items (label/value), subtotal per category with Separator, final total at bottom | Restrictions: Use text-sm for items, font-semibold for category names and subtotal, text-lg font-bold text-primary-600 for total | Success: Accordion expands/collapses, all categories display, calculations sum correctly, formatting consistent | Instructions: Set in-progress [-], implement breakdown accordion, log with log-implementation (artifacts: breakdown component), mark complete [x]_

- [x] 5.5. Create LeadCaptureDialog component
  - Files: `components/calculator/results/LeadCaptureDialog.tsx`
  - Implement dialog with lead form (name, email, phone, message, preferredProvider)
  - Handle form submission with validation
  - Purpose: Lead capture from results
  - _Leverage: Dialog, Input, Textarea, Select from shadcn/ui, leadCaptureSchema validation_
  - _Requirements: Requirement 9 (Lead Capture Dialog)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with form validation expertise | Task: Create LeadCaptureDialog.tsx per design document's "13. LeadCaptureDialog.tsx" section, implement LeadCaptureDialogProps with state, comparison, onSubmit props, create Dialog with trigger Button, form with Input (name, email, phone), Textarea (message), Select (preferredProvider with freelancer/agency/headon options defaulting to headon), validate with leadCaptureSchema before calling onSubmit, show success toast on submit, handle loading state | Restrictions: Must validate client-side with Zod, use toast from Sonner for feedback, disable submit while isSubmitting, clear form on success | Success: Dialog opens/closes, form validates, submission works, error handling robust, UX smooth | Instructions: Mark in-progress [-], implement dialog with form, log with log-implementation (artifacts: dialog component with form validation), mark complete [x]_

- [x] 5.6. Create results index barrel export
  - Files: `components/calculator/results/index.ts`
  - Export all results components
  - Purpose: Clean imports
  - _Leverage: Barrel export pattern_
  - _Requirements: All (code organization)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer | Task: Create index.ts in components/calculator/results/ that exports ComparisonGrid, ComparisonCard, SavingsHighlight, PriceBreakdown, LeadCaptureDialog using named exports | Restrictions: Alphabetical order | Success: All results components importable from single path | Instructions: Set in-progress [-], create barrel export, log implementation (artifacts: barrel export), mark complete [x]_

## Phase 6: Backend & Database

- [x] 6.1. Create Supabase database schema
  - Files: Execute SQL in Supabase Dashboard or migration file
  - Create `calculator_leads` table with all columns, indexes, RLS policies
  - Optionally create `calculator_sessions` table
  - Purpose: Data persistence for leads
  - _Leverage: Existing Supabase setup, pattern from `leads` table_
  - _Requirements: Requirement 9, 11 (Lead storage, tracking)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Database Administrator with PostgreSQL/Supabase expertise | Task: Execute SQL from design document's "Supabase Database Schema" section to create calculator_leads table with columns (id, created_at, name, email, phone, company, message, calculator_data JSONB, comparison_result JSONB, preferred_provider, lead_score, estimated_value, status, utm fields), create all indexes (email, created_at, status, lead_score, preferred_provider), enable RLS with service role policy, optionally create calculator_sessions table | Restrictions: Use uuid_generate_v4() for id, JSONB for complex objects, CHECK constraints for enums, test RLS policies work correctly | Success: Tables created successfully, indexes exist, RLS policies prevent unauthorized access, JSONB columns store data correctly | Instructions: Mark in-progress [-], execute SQL, log with log-implementation (artifacts: database tables with schema), mark complete [x]_

- [x] 6.2. Create calculator email template function
  - Files: `lib/email-templates.ts` (add new function)
  - Implement `createCalculatorResultEmail()` for user confirmation
  - Implement `createCalculatorNotificationEmail()` for team notification
  - Purpose: Email templates for leads
  - _Leverage: Existing `createContactEmailTemplate()` pattern_
  - _Requirements: Requirement 12 (Email-Benachrichtigungen)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Full-stack Developer with email template expertise | Task: Add two new functions to lib/email-templates.ts: createCalculatorResultEmail(leadData, comparison) returning HTML email for user with greeting, project summary, 3-way comparison table, savings highlight, CTA to book call (Calendly), cost breakdown; createCalculatorNotificationEmail(leadData, comparison) for team with lead score badge, lead info grid, calculator data, comparison result, reply-to set to user email - follow existing template patterns with inline CSS | Restrictions: Must return string with DOCTYPE html, use responsive tables, inline all CSS, use priority colors (green/orange/red) based on lead_score, German language throughout | Success: Both functions return valid HTML emails, tables render in email clients, responsive design works, German text correct | Instructions: Set in-progress [-], add template functions, log with log-implementation (artifacts: email template functions), mark complete [x]_

- [x] 6.3. Create API route for calculator
  - Files: `app/api/calculator/route.ts`
  - Implement POST handler with validation, Supabase save, email sending
  - Calculate lead score based on budget, timeline, features
  - Purpose: Backend endpoint for lead submission
  - _Leverage: Pattern from `app/api/contact/route.ts`, Supabase client, Resend_
  - _Requirements: Requirement 9, 12 (Lead capture, email notifications)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Backend Developer with API design expertise | Task: Create app/api/calculator/route.ts with POST handler following pattern from app/api/contact/route.ts, validate request body with calculatorAPISchema, calculate lead_score (budget high=+15, timeline urgent=+10, features count=+1 each, preferred HEADON=+10), save to calculator_leads with Supabase service role client, send 2 emails (user confirmation with createCalculatorResultEmail, team notification with createCalculatorNotificationEmail) via Resend, return success/error JSON response | Restrictions: Use try-catch for error handling, validate with Zod and return 400 on failure, don't block on email errors (log only), return 200 on success with { success: true, message } | Success: API validates input, saves to database correctly, calculates lead score accurately, sends both emails, returns proper status codes and errors | Instructions: Mark in-progress [-], implement API route, log with log-implementation (artifacts: API endpoint with validation and integrations), mark complete [x]_

## Phase 7: Multi-Landing-Page Implementation

### Landing Page 1: Primary Keyword (webseite-erstellen-lassen-kosten)

- [x] 7.1. Create primary landing page metadata
  - Files: `app/webseite-erstellen-lassen-kosten/metadata.ts`
  - Define SEO metadata per design document's "Meta-Tags per Landing Page" section #1
  - Purpose: SEO optimization for high-volume keyword
  - _Leverage: Metadata pattern from other pages_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Specialist | Task: Create app/webseite-erstellen-lassen-kosten/metadata.ts with exact content from design document section "1. /webseite-erstellen-lassen-kosten/metadata.ts", including title "Webseite erstellen lassen - Kosten & Preise 2025 | HEADON.pro", description, keywords array, openGraph, canonical | Restrictions: Use exact Meta structure from design doc, all keywords in German | Success: Metadata exports correctly, SEO-optimized for "webseite erstellen lassen kosten" | Instructions: Set in-progress [-], create metadata, log implementation, mark complete [x]_

- [x] 7.2. Create primary landing page component
  - Files: `app/webseite-erstellen-lassen-kosten/page.tsx`
  - Render hero (H1: "Webseite erstellen lassen - Kosten 2025"), trust badges, CostCalculator, unique content section, FAQ
  - Purpose: Main entry page for calculator
  - _Leverage: CostCalculator component (3.3)_
  - _Requirements: Requirement 1 (Calculator entry)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Next.js Developer | Task: Create app/webseite-erstellen-lassen-kosten/page.tsx as Server Component, export metadata from './metadata', render: H1 "Webseite erstellen lassen - Was kostet es wirklich? (2025)", trust indicators "500+ Projekte • ⌀4.9★ • 100% Transparenz", CostCalculator component, unique content section (300-500 words about Gesamtprozess & Kostenfaktoren), FAQ section with 6-8 questions about "webseite erstellen lassen kosten" | Restrictions: Server Component, semantic HTML, unique content (no duplication with other pages) | Success: Page renders, H1 SEO-optimized, unique content present | Instructions: Mark in-progress [-], create page, log implementation, mark complete [x]_

### Landing Page 2: Alternative Keyword (homepage-kosten)

- [x] 7.3. Create homepage-kosten metadata
  - Files: `app/homepage-kosten/metadata.ts`
  - Define SEO metadata per design document's "Meta-Tags per Landing Page" section #2
  - Purpose: SEO optimization for alternative keyword
  - _Leverage: Metadata pattern from 7.1_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Specialist | Task: Create app/homepage-kosten/metadata.ts with exact content from design document section "2. /homepage-kosten/metadata.ts", title "Homepage Kosten Rechner 2025", keywords focused on "homepage kosten" variants | Restrictions: Follow design doc Meta structure | Success: Metadata SEO-optimized for "homepage kosten" keyword | Instructions: Set in-progress [-], create metadata, log implementation, mark complete [x]_

- [x] 7.4. Create homepage-kosten page component
  - Files: `app/homepage-kosten/page.tsx`
  - Render hero (H1: "Homepage Kosten Rechner"), CostCalculator, unique content (focus: kleine Business-Homepages), unique FAQ
  - Purpose: Alternative landing page
  - _Leverage: CostCalculator component (3.3), page structure from 7.2_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Next.js Developer | Task: Create app/homepage-kosten/page.tsx, H1 "Homepage Kosten 2025 - Transparent kalkuliert", CostCalculator, unique content section focusing on kleine Business-Homepages (different from 7.2!), FAQ with 6 questions specific to "homepage kosten" | Restrictions: Must have unique content (not copy from other pages) | Success: Page renders with unique H1 and content | Instructions: Set in-progress [-], create page, log implementation, mark complete [x]_

### Landing Page 3: Provider-Focused (webdesigner-preise)

- [x] 7.5. Create webdesigner-preise metadata
  - Files: `app/webdesigner-preise/metadata.ts`
  - Define SEO metadata per design document's "Meta-Tags per Landing Page" section #3
  - Purpose: SEO optimization for provider-focused keyword
  - _Leverage: Metadata pattern from 7.1, 7.3_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Specialist | Task: Create app/webdesigner-preise/metadata.ts with exact content from design document section "3. /webdesigner-preise/metadata.ts", title "Webdesigner Preise 2025", keywords focused on "webdesigner preise" and "webdesign kosten" | Restrictions: Follow design doc | Success: Metadata SEO-optimized for "webdesigner preise" | Instructions: Set in-progress [-], create metadata, log implementation, mark complete [x]_

- [x] 7.6. Create webdesigner-preise page component
  - Files: `app/webdesigner-preise/page.tsx`
  - Render hero (H1: "Webdesigner Preise"), CostCalculator, unique content (focus: Dienstleister-Vergleich), unique FAQ
  - Purpose: Provider-focused landing page
  - _Leverage: CostCalculator component, page structure from 7.2_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Next.js Developer | Task: Create app/webdesigner-preise/page.tsx, H1 "Webdesigner Preise 2025 - Transparent vergleichen", CostCalculator, unique content focusing on Freelancer vs Agentur Dienstleister-Vergleich (different from other pages!), FAQ with 7 questions about webdesigner costs/pricing models | Restrictions: Unique content required | Success: Page renders with provider-focused content | Instructions: Set in-progress [-], create page, log implementation, mark complete [x]_

### Landing Page 4: Mixed Variant (website-kosten)

- [x] 7.7. Create website-kosten metadata
  - Files: `app/website-kosten/metadata.ts`
  - Define SEO metadata per design document's "Meta-Tags per Landing Page" section #4
  - Purpose: SEO optimization for EN/DE mixed keyword
  - _Leverage: Metadata pattern from previous pages_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Specialist | Task: Create app/website-kosten/metadata.ts with exact content from design document section "4. /website-kosten/metadata.ts", title "Website Kosten Rechner 2025", keywords focused on "website kosten" variants | Restrictions: Follow design doc | Success: Metadata SEO-optimized for "website kosten" | Instructions: Set in-progress [-], create metadata, log implementation, mark complete [x]_

- [x] 7.8. Create website-kosten page component
  - Files: `app/website-kosten/page.tsx`
  - Render hero (H1: "Website Kosten"), CostCalculator, unique content (focus: technische Aspekte), unique FAQ
  - Purpose: EN/DE mixed keyword landing page
  - _Leverage: CostCalculator component, page structure_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Next.js Developer | Task: Create app/website-kosten/page.tsx, H1 "Website Kosten Rechner 2025", CostCalculator, unique content focusing on technische Aspekte & Komplexität (different from all other pages!), FAQ with 6 questions about technical cost factors | Restrictions: Unique content | Success: Page renders with technical focus | Instructions: Set in-progress [-], create page, log implementation, mark complete [x]_

### Legacy Redirect & Supporting Infrastructure

- [x] 7.9. Create legacy redirect from /kostenrechner
  - Files: `app/kostenrechner/page.tsx`
  - Implement 301 redirect to primary landing page
  - Purpose: Handle old URLs, redirect to main page
  - _Leverage: Next.js redirect() function_
  - _Requirements: SEO requirements (avoid 404s)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Next.js Developer | Task: Create app/kostenrechner/page.tsx that uses redirect('/webseite-erstellen-lassen-kosten', 'replace') from next/navigation to perform 301 permanent redirect | Restrictions: Use redirect() not Router, must be permanent redirect (301) | Success: /kostenrechner redirects to primary page with 301 status | Instructions: Set in-progress [-], create redirect, log implementation, mark complete [x]_

- [x] 7.10. Add Schema.org structured data helper
  - Files: `lib/calculator/schema-builder.ts`
  - Create reusable function to generate WebApplication + FAQPage schema
  - Purpose: DRY schema generation for all landing pages
  - _Leverage: Schema.org patterns from design doc_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Developer | Task: Create lib/calculator/schema-builder.ts with function createCalculatorSchema(faqItems: {question: string, answer: string}[]) that returns JSON-LD object with WebApplication + FAQPage schema from design document's "Schema.org Markup" section, FAQPage.mainEntity populated from faqItems parameter | Restrictions: Return object ready for JSON.stringify, follow schema.org spec exactly | Success: Function returns valid schema, reusable across pages | Instructions: Set in-progress [-], create helper, log implementation, mark complete [x]_

- [x] 7.11. Integrate Schema.org on all landing pages
  - Files: Update all 4 landing page components (7.2, 7.4, 7.6, 7.8)
  - Add JSON-LD script tag with schema using schema-builder helper
  - Purpose: Rich snippets in search results
  - _Leverage: Schema builder from 7.10_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Developer | Task: Update all 4 landing page components to import createCalculatorSchema(), create page-specific FAQ array, generate schema, add <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} /> to each page | Restrictions: Each page must have unique FAQ items (6-8 questions), validate schema with Google Rich Results Test | Success: All 4 pages have valid Schema.org markup, FAQs unique per page | Instructions: Set in-progress [-], add schemas, log implementation, mark complete [x]_

- [x] 7.12. Update sitemap for new routes
  - Files: `app/sitemap.ts`
  - Add all 4 new landing pages to dynamic sitemap
  - Purpose: Search engine discoverability
  - _Leverage: Existing sitemap generator pattern_
  - _Requirements: SEO requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Developer | Task: Update app/sitemap.ts to add 4 new routes: /webseite-erstellen-lassen-kosten (priority: 0.9), /homepage-kosten (priority: 0.8), /webdesigner-preise (priority: 0.8), /website-kosten (priority: 0.8), all with changeFrequency: 'monthly', lastModified: new Date() | Restrictions: Primary page gets highest priority (0.9), follow existing sitemap structure | Success: All 4 pages appear in sitemap.xml, priorities set correctly | Instructions: Set in-progress [-], update sitemap, log implementation, mark complete [x]_

- [x] 7.13. Integrate Umami analytics tracking
  - Files: CostCalculator component (update from 3.3)
  - Add Umami event tracking for calculator interactions
  - Track: step-completed, feature-selected, result-viewed, lead-captured, abandoned + page variant
  - Purpose: Conversion funnel analysis per landing page
  - _Leverage: Existing Umami integration, window.location.pathname for page detection_
  - _Requirements: Requirement 11 (Analytics & Event Tracking)_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Analytics Engineer with Umami expertise | Task: Add Umami tracking to CostCalculator component, use window.umami?.track() for events: 'calculator-step-completed' with { step, page: pathname }, 'calculator-feature-selected' with { feature, page }, 'calculator-result-viewed' with { projectType, estimatedPrice, provider, page }, 'calculator-lead-captured' with { provider, leadScore, estimatedValue, page }, 'calculator-abandoned' with { lastStep, page }, where page is detected from window.location.pathname | Restrictions: Check window.umami exists, don't block UI, track which landing page variant user came from | Success: Events fire with page variant tracking, appear in Umami dashboard, can segment by landing page | Instructions: Set in-progress [-], add analytics, log implementation, mark complete [x]_

## Phase 8: Testing & Polish

- [ ] 8.1. Test calculator flow end-to-end manually
  - Files: None (manual testing)
  - Complete calculator from step 1-6, submit lead, verify email
  - Test on desktop and mobile viewports
  - Purpose: Functional verification
  - _Leverage: Browser DevTools, Email inbox_
  - _Requirements: All requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: QA Tester | Task: Manually test complete calculator flow: navigate to /kostenrechner, complete steps 1-6 selecting various options, verify live preview updates, check step 6 comparison displays correctly, submit lead form with test data, verify user email received, verify team email received, test on desktop (1920x1080) and mobile (375x667) viewports, check responsive layouts, test keyboard navigation | Restrictions: Document any bugs found, test with different input combinations, verify calculations match expected values from pricing config | Success: Calculator works end-to-end, no blocking bugs, emails deliver, responsive design works, accessibility basic compliance | Instructions: Mark in-progress [-], conduct manual testing, log with log-implementation (artifacts: testing report with findings), mark complete [x]_

- [ ] 8.2. Fix any bugs found in testing
  - Files: Various (depending on bugs)
  - Address all bugs from manual testing
  - Purpose: Bug resolution
  - _Leverage: Error logs, debugging tools_
  - _Requirements: All_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Senior Developer | Task: Review bugs documented in task 8.1, prioritize by severity, fix all blocking and high-priority bugs, test fixes, ensure no regressions introduced | Restrictions: Create separate commits per bug fix for tracking, add tests if bug was missed by testing gap, document fixes in code comments if complex | Success: All critical bugs resolved, fixes tested and verified, no new bugs introduced | Instructions: Set in-progress [-], fix bugs, log with log-implementation (artifacts: bug fixes with descriptions), mark complete [x]_

- [ ] 8.3. Optimize performance
  - Files: Various components
  - Add React.memo where needed, optimize re-renders, lazy load step components
  - Measure with Lighthouse
  - Purpose: Performance targets (LCP < 1.5s)
  - _Leverage: React.memo, React.lazy, useMemo, useCallback_
  - _Requirements: Performance requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Performance Engineer | Task: Optimize calculator performance: wrap shared components in React.memo, use React.lazy for step components with Suspense fallback, add useCallback for event handlers passed as props, verify useMemo for expensive calculations, run Lighthouse on /kostenrechner and optimize to achieve LCP < 1.5s, FID < 100ms, CLS < 0.1, Score 95+ | Restrictions: Don't over-optimize (avoid premature optimization), measure before/after with Lighthouse, ensure optimizations don't break functionality | Success: Lighthouse scores meet targets, page loads under 1.5s LCP, no performance regressions, optimizations documented | Instructions: Mark in-progress [-], implement optimizations, log with log-implementation (artifacts: performance optimizations with before/after metrics), mark complete [x]_

- [ ] 8.4. Verify accessibility compliance
  - Files: All components
  - Test keyboard navigation, screen reader support, color contrast
  - Aim for WCAG AA compliance
  - Purpose: Accessibility requirements
  - _Leverage: Keyboard, axe DevTools, WAVE_
  - _Requirements: Accessibility requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Accessibility Specialist | Task: Verify WCAG AA compliance for calculator: test complete keyboard navigation (Tab, Enter, Arrow keys, Escape), verify all interactive elements have focus indicators, test with screen reader (NVDA/JAWS/VoiceOver), check color contrast ratios with axe DevTools, ensure ARIA labels present where needed, verify form labels associated, run WAVE and fix flagged issues | Restrictions: Don't rely on color alone for information, ensure keyboard focus order is logical, all images have alt text | Success: Full keyboard navigation works, screen reader announces correctly, color contrast meets 4.5:1, ARIA implemented properly, WAVE/axe pass | Instructions: Set in-progress [-], conduct accessibility audit, log with log-implementation (artifacts: accessibility improvements and compliance report), mark complete [x]_

- [ ] 8.5. Write documentation
  - Files: `docs/kostenrechner-feature-plan.md` (update status), README additions
  - Document calculator usage, pricing logic, customization guide
  - Purpose: Maintainability
  - _Leverage: Existing docs pattern_
  - _Requirements: Documentation requirements_
  - _Prompt: Implement the task for spec kostenrechner, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Technical Writer | Task: Update docs/kostenrechner-feature-plan.md status to 🟢 Complete, add "Implementation Notes" section documenting: calculator structure and components, how to update pricing (edit pricing-config.ts), how to add new features (extend types + add to StepFeatures), calculator engine explanation, email template customization, how to modify lead scoring, analytics events reference, troubleshooting common issues | Restrictions: Use clear language, include code examples where helpful, link to relevant files, keep concise | Success: Documentation complete and accurate, maintainers can understand and modify calculator, troubleshooting guide useful | Instructions: Mark in-progress [-], write documentation, log with log-implementation (artifacts: documentation files updated), mark complete [x]_

---

## Summary

**Total Tasks:** 52 atomic tasks (+9 from Multi-Landing-Page-Strategie)
**Estimated Duration:** 22-30 days (solo developer) or 12-18 days (2 developers parallel)

**Phases:**
1. Foundation (5 tasks): Types, pricing, validation, engine, utils
2. Shared UI (6 tasks): shadcn install, 4 shared components, index
3. Core (3 tasks): Progress, Preview, Main Container
4. Steps (6 tasks): 5 step components, index
5. Results (6 tasks): 5 result components, index
6. Backend (3 tasks): Database, email templates, API
7. Multi-Landing-Pages (13 tasks): 4 Landing Pages (Metadata + Component each), Legacy Redirect, Schema Helper, Schema Integration, Sitemap, Analytics
8. Testing & Polish (5 tasks): Manual test, bugs, performance, a11y, docs

**Dependencies Flow:**
- Phase 1 → All other phases (foundation)
- Phase 2 → Phases 3-5 (components)
- Phases 3-5 can partially overlap
- Phase 6 parallel to 3-5 (backend independent)
- Phase 7 depends on 3-5 (page uses components)
- Phase 8 after all (testing & polish)

**Implementation Order:**
1. Start with Phase 1 (1.1 → 1.5 sequential)
2. Install shadcn components (2.1)
3. Build shared components (2.2 → 2.5 parallel possible)
4. Core container (3.1 → 3.3 sequential)
5. Step components (4.1 → 4.5 can be parallel)
6. Results components (5.1 → 5.5 partially parallel)
7. Backend (6.1 → 6.3 sequential)
8. Multi-Landing-Pages (7.1 → 7.13):
   - 7.1-7.8: Landing Pages (can be done in parallel per page)
   - 7.9: Redirect (quick)
   - 7.10: Schema helper (foundation for 7.11)
   - 7.11-7.13: Integration tasks (sequential)
9. Testing & polish (8.1 → 8.5 sequential)

**Each task includes:**
- ✅ File paths
- ✅ Clear description
- ✅ _Leverage (what to reuse)
- ✅ _Requirements (which requirements addressed)
- ✅ _Prompt (complete implementation guide with role, task, restrictions, success criteria, and workflow instructions)
