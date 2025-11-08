-- KnowCall Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    block_hidden_numbers BOOLEAN DEFAULT true,
    block_international BOOLEAN DEFAULT false,
    block_unknown BOOLEAN DEFAULT true,
    auto_mute_spam BOOLEAN DEFAULT true,
    enable_notifications BOOLEAN DEFAULT true,
    language VARCHAR(2) DEFAULT 'th',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blocked numbers table
CREATE TABLE IF NOT EXISTS blocked_numbers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(2),
    is_international BOOLEAN DEFAULT false,
    reason VARCHAR(50),
    source VARCHAR(50),
    report_count INTEGER DEFAULT 0,
    risk_level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User reports table
CREATE TABLE IF NOT EXISTS user_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    reason VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Call logs table
CREATE TABLE IF NOT EXISTS call_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    call_type VARCHAR(20) NOT NULL,
    duration INTEGER DEFAULT 0,
    was_blocked BOOLEAN DEFAULT false,
    risk_level VARCHAR(20),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Whitelist table
CREATE TABLE IF NOT EXISTS whitelist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, phone_number)
);

-- Blacklist table
CREATE TABLE IF NOT EXISTS blacklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, phone_number)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blocked_numbers_phone ON blocked_numbers(phone_number);
CREATE INDEX IF NOT EXISTS idx_user_reports_phone ON user_reports(phone_number);
CREATE INDEX IF NOT EXISTS idx_call_logs_user_timestamp ON call_logs(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_whitelist_user ON whitelist(user_id);
CREATE INDEX IF NOT EXISTS idx_blacklist_user ON blacklist(user_id);
