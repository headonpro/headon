-- Migration: Calculator Leads Schema
-- Created: 2025-11-20
-- Purpose: Create tables, indexes, and RLS policies for Kostenrechner feature

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Table: calculator_leads
-- Purpose: Store lead submissions from the cost calculator
-- ============================================================================

CREATE TABLE IF NOT EXISTS calculator_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Lead Contact Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,

  -- Calculator Data (JSONB)
  -- Structure: Complete CalculatorState object
  calculator_data JSONB NOT NULL,

  -- Comparison Result (JSONB)
  -- Structure: ComparisonResult with 3-way provider comparison
  comparison_result JSONB NOT NULL,

  -- Preferences
  preferred_provider TEXT CHECK (preferred_provider IN ('freelancer', 'agency', 'headon')),

  -- Scoring & Value
  lead_score INTEGER,
  estimated_value INTEGER, -- Average price in cents (e.g., 12500.00 EUR → 1250000 cents)

  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),

  -- UTM Tracking & Analytics
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  user_agent TEXT,

  -- Email Validation Constraint
  CONSTRAINT calculator_leads_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_calculator_leads_email ON calculator_leads(email);
CREATE INDEX IF NOT EXISTS idx_calculator_leads_created_at ON calculator_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calculator_leads_status ON calculator_leads(status);
CREATE INDEX IF NOT EXISTS idx_calculator_leads_lead_score ON calculator_leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_calculator_leads_preferred_provider ON calculator_leads(preferred_provider);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

-- Enable RLS on calculator_leads table
ALTER TABLE calculator_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access calculator_leads
-- This ensures only backend API routes with service role key can read/write
CREATE POLICY "Service role can access all calculator_leads"
  ON calculator_leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================================
-- Table: calculator_sessions (Optional - Anonymous Tracking)
-- Purpose: Track anonymous calculator sessions for analytics
-- ============================================================================

CREATE TABLE IF NOT EXISTS calculator_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Session ID (for URL sharing and session recovery)
  session_id TEXT UNIQUE NOT NULL,

  -- Calculator Data (JSONB)
  calculator_data JSONB,
  comparison_result JSONB,

  -- Progress Tracking
  completed BOOLEAN DEFAULT FALSE,
  step_reached INTEGER DEFAULT 1,

  -- Anonymous Metadata
  utm_source TEXT,
  referrer TEXT,
  user_agent TEXT,

  -- Expiration (auto-cleanup after 30 days)
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
);

-- ============================================================================
-- Indexes for calculator_sessions
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_calculator_sessions_session_id ON calculator_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_created_at ON calculator_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_completed ON calculator_sessions(completed);
CREATE INDEX IF NOT EXISTS idx_calculator_sessions_expires_at ON calculator_sessions(expires_at);

-- ============================================================================
-- Auto-Cleanup Function for Expired Sessions
-- ============================================================================

CREATE OR REPLACE FUNCTION delete_expired_calculator_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM calculator_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Comments for Documentation
-- ============================================================================

COMMENT ON TABLE calculator_leads IS 'Stores lead submissions from the cost calculator with complete state and comparison data';
COMMENT ON COLUMN calculator_leads.calculator_data IS 'Complete CalculatorState object stored as JSONB';
COMMENT ON COLUMN calculator_leads.comparison_result IS 'ComparisonResult with freelancer, agency, and HEADON estimates';
COMMENT ON COLUMN calculator_leads.lead_score IS 'Calculated lead quality score (higher = better quality)';
COMMENT ON COLUMN calculator_leads.estimated_value IS 'Estimated project value in cents';

COMMENT ON TABLE calculator_sessions IS 'Optional: Anonymous session tracking for calculator usage analytics';
COMMENT ON COLUMN calculator_sessions.session_id IS 'Unique session identifier for URL sharing';
COMMENT ON COLUMN calculator_sessions.expires_at IS 'Auto-cleanup after 30 days';
