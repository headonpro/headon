-- Migration: Create Analytics Tables for SEO/GEO Strategy
-- Date: 2025-10-12
-- Purpose: Setup database tables for keyword rankings, conversion events, and page performance tracking

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- Table 1: keyword_rankings
-- Purpose: Track keyword ranking positions over time
-- =====================================================
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 1 AND position <= 100),
  url TEXT NOT NULL,
  search_volume INTEGER,
  competition TEXT CHECK (competition IN ('low', 'medium', 'high')),
  category TEXT CHECK (category IN ('speed-niche', 'tech-stack', 'use-case', 'local')),
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for keyword_rankings
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_keyword ON keyword_rankings(keyword);
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_tracked_at ON keyword_rankings(tracked_at DESC);
CREATE INDEX IF NOT EXISTS idx_keyword_rankings_category ON keyword_rankings(category);

-- =====================================================
-- Table 2: conversion_events
-- Purpose: Track conversion events and user interactions
-- =====================================================
CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL CHECK (event_type IN ('contact_form', 'fastlane_inquiry', 'newsletter_signup', 'code_example_copied')),
  source_url TEXT NOT NULL,
  source_keyword TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for conversion_events
CREATE INDEX IF NOT EXISTS idx_conversion_events_type ON conversion_events(event_type);
CREATE INDEX IF NOT EXISTS idx_conversion_events_created_at ON conversion_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversion_events_source_keyword ON conversion_events(source_keyword);
CREATE INDEX IF NOT EXISTS idx_conversion_events_source_url ON conversion_events(source_url);

-- =====================================================
-- Table 3: page_performance
-- Purpose: Track Core Web Vitals and performance metrics
-- =====================================================
CREATE TABLE IF NOT EXISTS page_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_name TEXT NOT NULL CHECK (metric_name IN ('LCP', 'FID', 'CLS', 'TTFB', 'FCP', 'INP')),
  metric_value NUMERIC NOT NULL CHECK (metric_value >= 0),
  page_url TEXT NOT NULL,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  connection_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for page_performance
CREATE INDEX IF NOT EXISTS idx_page_performance_metric_name ON page_performance(metric_name);
CREATE INDEX IF NOT EXISTS idx_page_performance_page_url ON page_performance(page_url);
CREATE INDEX IF NOT EXISTS idx_page_performance_created_at ON page_performance(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_performance_metric_page ON page_performance(metric_name, page_url);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE keyword_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_performance ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to insert into keyword_rankings
CREATE POLICY "Allow authenticated inserts to keyword_rankings"
  ON keyword_rankings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to read keyword_rankings
CREATE POLICY "Allow authenticated reads from keyword_rankings"
  ON keyword_rankings
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role full access to keyword_rankings
CREATE POLICY "Allow service role full access to keyword_rankings"
  ON keyword_rankings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to insert into conversion_events
CREATE POLICY "Allow authenticated inserts to conversion_events"
  ON conversion_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow anon users to insert conversion events (for public tracking)
CREATE POLICY "Allow anon inserts to conversion_events"
  ON conversion_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read conversion_events
CREATE POLICY "Allow authenticated reads from conversion_events"
  ON conversion_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role full access to conversion_events
CREATE POLICY "Allow service role full access to conversion_events"
  ON conversion_events
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to insert into page_performance
CREATE POLICY "Allow authenticated inserts to page_performance"
  ON page_performance
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow anon users to insert page performance (for public tracking)
CREATE POLICY "Allow anon inserts to page_performance"
  ON page_performance
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read page_performance
CREATE POLICY "Allow authenticated reads from page_performance"
  ON page_performance
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow service role full access to page_performance
CREATE POLICY "Allow service role full access to page_performance"
  ON page_performance
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- Comments for documentation
-- =====================================================

COMMENT ON TABLE keyword_rankings IS 'Tracks keyword ranking positions over time for SEO analysis';
COMMENT ON TABLE conversion_events IS 'Tracks user conversion events and interactions for analytics';
COMMENT ON TABLE page_performance IS 'Tracks Core Web Vitals and performance metrics';

COMMENT ON COLUMN keyword_rankings.keyword IS 'The keyword being tracked';
COMMENT ON COLUMN keyword_rankings.position IS 'Search engine ranking position (1-100)';
COMMENT ON COLUMN keyword_rankings.url IS 'URL that appears in search results';
COMMENT ON COLUMN keyword_rankings.search_volume IS 'Monthly search volume for the keyword';
COMMENT ON COLUMN keyword_rankings.competition IS 'Keyword competition level';
COMMENT ON COLUMN keyword_rankings.category IS 'Category of the keyword for grouping';

COMMENT ON COLUMN conversion_events.event_type IS 'Type of conversion event';
COMMENT ON COLUMN conversion_events.source_url IS 'Page URL where conversion occurred';
COMMENT ON COLUMN conversion_events.source_keyword IS 'Keyword that brought user to the page';
COMMENT ON COLUMN conversion_events.metadata IS 'Additional event metadata in JSON format';

COMMENT ON COLUMN page_performance.metric_name IS 'Name of the performance metric (LCP, FID, CLS, etc.)';
COMMENT ON COLUMN page_performance.metric_value IS 'Numeric value of the metric';
COMMENT ON COLUMN page_performance.page_url IS 'URL of the page being measured';
COMMENT ON COLUMN page_performance.device_type IS 'Type of device used for measurement';
