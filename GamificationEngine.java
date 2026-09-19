package com.swasthyasangam.service;

import org.springframework.stereotype.Service;
import java.util.*;

/**
 * Core Module: Gamification Engine
 * Handles streaks, points for consistency, badges, and national college rankings.
 */
@Service
public class GamificationEngine {

    public Map<String, Object> calculateStreakAndPoints(int currentStreak, int completedMissionsCount) {
        int bonusMultiplier = Math.min(currentStreak / 3, 5); // Higher streak = higher multiplier
        int awardedPoints = completedMissionsCount * 50 * (1 + bonusMultiplier);

        Map<String, Object> gamificationSummary = new HashMap<>();
        gamificationSummary.put("currentStreak", currentStreak);
        gamificationSummary.put("streakBonusMultiplier", bonusMultiplier + "x");
        gamificationSummary.put("awardedPoints", awardedPoints);
        gamificationSummary.put("milestoneUnlocked", currentStreak >= 7 ? "7-Day Streak Master" : null);

        return gamificationSummary;
    }

    public List<Map<String, Object>> getSampleLeaderboard() {
        return List.of(
            Map.of("rank", 1, "name", "Aarav 'Iron' Singhania", "college", "IIT Delhi", "points", 3450, "streak", 21),
            Map.of("rank", 2, "name", "Devansh Nambiar", "college", "NIT Trichy", "points", 3120, "streak", 18),
            Map.of("rank", 3, "name", "Simran Kaur", "college", "Panjab University", "points", 2980, "streak", 15),
            Map.of("rank", 4, "name", "Arjun Verma (You)", "college", "DTU Delhi", "points", 1450, "streak", 8),
            Map.of("rank", 5, "name", "Meera Nair", "college", "BITS Pilani", "points", 1390, "streak", 7)
        );
    }
}
