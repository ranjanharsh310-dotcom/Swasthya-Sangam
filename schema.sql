-- =============================================================================
-- SMART INDIA HACKATHON 2026 - Problem Statement ID: 26196
-- Project: Swasthya Sangam | Team: Naag Shakti
-- Database Engine: MySQL 8.0+
-- =============================================================================

CREATE DATABASE IF NOT EXISTS swasthya_sangam_db;
USE swasthya_sangam_db;

-- 1. Core Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Fitness Profile Table (Physiological metrics & BMI)
CREATE TABLE IF NOT EXISTS fitness_profiles (
    user_id VARCHAR(50) PRIMARY KEY,
    dob DATE,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    bmi DECIMAL(4,1),
    fitness_level VARCHAR(50) DEFAULT 'Beginner',
    primary_goal VARCHAR(100) DEFAULT 'Calisthenics Strength & Core',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Normalized User Sports & Skills Interests
CREATE TABLE IF NOT EXISTS user_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    skill_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_skill (user_id, skill_name)
);

-- 4. Gamified Daily Missions & Streaks
CREATE TABLE IF NOT EXISTS streaks (
    user_id VARCHAR(50) PRIMARY KEY,
    current_streak INT DEFAULT 1,
    longest_streak INT DEFAULT 1,
    xp_points INT DEFAULT 0,
    last_active_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS daily_missions (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    mission_title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    target_metric VARCHAR(50) NOT NULL,
    xp_reward INT DEFAULT 50,
    is_completed BOOLEAN DEFAULT FALSE,
    assigned_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Fitness Tournaments & Challenges
CREATE TABLE IF NOT EXISTS tournaments (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(80) NOT NULL,
    organizer VARCHAR(100) NOT NULL,
    participants_count INT DEFAULT 0,
    end_date DATE,
    prize VARCHAR(150),
    description TEXT
);

CREATE TABLE IF NOT EXISTS tournament_registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tournament_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_reg (tournament_id, user_id)
);

-- 6. Community Matchmaking & Geolocation
CREATE TABLE IF NOT EXISTS community_partners (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    location_name VARCHAR(150),
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    primary_sport VARCHAR(50),
    fitness_level VARCHAR(50),
    bio TEXT,
    avatar_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS partner_connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id VARCHAR(50) NOT NULL,
    receiver_id VARCHAR(50) NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'DECLINED') DEFAULT 'ACCEPTED',
    matched_sport VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- Initial Seed Data for Prototype Demo
-- =============================================================================

INSERT INTO users (id, name, email, password_hash, avatar_url) VALUES
('user_01', 'Arjun Verma', 'arjun.fitness@swasthya.in', 'hashed_pwd_123', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');

INSERT INTO fitness_profiles (user_id, dob, age, gender, height_cm, weight_kg, bmi, fitness_level, primary_goal) VALUES
('user_01', '2003-08-15', 23, 'Male', 176.0, 70.0, 22.6, 'Intermediate Calisthenics', 'Calisthenics Strength & Core');

INSERT INTO user_skills (user_id, skill_name) VALUES
('user_01', 'Calisthenics'),
('user_01', 'Football'),
('user_01', 'Yoga'),
('user_01', 'Running');

INSERT INTO streaks (user_id, current_streak, longest_streak, xp_points, last_active_date) VALUES
('user_01', 8, 14, 1450, CURDATE());

INSERT INTO tournaments (id, title, category, organizer, participants_count, end_date, prize, description) VALUES
('tourn_1', 'Fit India Youth Pushup Knockout', 'Calisthenics & Strength', 'Fit India Mission', 1240, DATE_ADD(CURDATE(), INTERVAL 4 DAY), 'Gold Fitness Pass + SIH Certificate', 'Submit 60-second verified pushups video. Top 10 enter national finals.'),
('tourn_2', 'Inter-College 7-Day 70,000 Steps League', 'Cardio & Walking', 'Ministry of Youth Affairs & Sports', 3820, DATE_ADD(CURDATE(), INTERVAL 6 DAY), 'Smart Sports Watch & College Trophy', 'Average 10,000 steps daily for 7 consecutive days.'),
('tourn_3', 'Sunrise 108 Surya Namaskar Challenge', 'Yoga & Mindfulness', 'National Yoga Federation', 980, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 'Yoga Achiever Badge & Ministry Certificate', 'Complete 108 rounds in sets of 12 with rhythmic breathing.');

INSERT INTO community_partners (id, name, age, location_name, latitude, longitude, primary_sport, fitness_level, bio, avatar_url) VALUES
('partner_1', 'Rohan Kulkarni', 22, 'Green Park Sports Arena (0.8 km)', 28.558500, 77.202500, 'Football', 'Intermediate', 'Looking for morning football buddies and calisthenics partners at park bars.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
('partner_2', 'Pooja Sharma', 21, 'Lotus Temple Grounds (1.4 km)', 28.553500, 77.258800, 'Yoga', 'Advanced', 'Certified student yoga practitioner conducting sunrise Surya Namaskar.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'),
('partner_3', 'Vikramaditya Rao', 24, 'University Sports Complex (2.1 km)', 28.580000, 77.215000, 'Calisthenics', 'Elite', 'Calisthenics fanatic training for muscle-ups and handstands.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80');
