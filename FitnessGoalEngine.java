package com.swasthyasangam.service;

import org.springframework.stereotype.Service;
import java.util.*;

/**
 * Core Module: Fitness Goal Engine
 * Generates equipment-free, bodyweight routines dynamically.
 */
@Service
public class FitnessGoalEngine {

    public Map<String, Object> generateWorkoutRoutine(String goal, Double bmi, String fitnessLevel) {
        Map<String, Object> result = new HashMap<>();
        result.put("bmi", bmi != null ? bmi : 22.5);
        result.put("fitnessLevel", fitnessLevel != null ? fitnessLevel : "Intermediate");

        List<Map<String, Object>> days = new ArrayList<>();

        if (goal != null && (goal.toLowerCase().contains("fat") || goal.toLowerCase().contains("hiit"))) {
            result.put("goalTitle", "Fat Loss & High-Energy HIIT");
            result.put("weeklySplit", "5-Day Metabolic Conditioning & Calorie Torcher");

            Map<String, Object> day1 = new HashMap<>();
            day1.put("day", "Day 1: Full Body Calorie Inferno");
            day1.put("focus", "Cardiovascular VO2 Max & Metabolic Rate");
            day1.put("exercises", List.of(
                Map.of("name", "Jumping Jacks + High Knees", "sets", "4 Sets", "reps", "60 Seconds", "rest", "30s", "note", "Light landing on toes, steady breath."),
                Map.of("name", "Bodyweight Burpees", "sets", "4 Sets", "reps", "12 Reps", "rest", "45s", "note", "Explosive jump at finish."),
                Map.of("name", "Squat Pulses", "sets", "3 Sets", "reps", "25 Reps", "rest", "45s", "note", "Stay in bottom 3 inches of squat.")
            ));
            days.add(day1);
        } else if (goal != null && (goal.toLowerCase().contains("yoga") || goal.toLowerCase().contains("flex"))) {
            result.put("goalTitle", "Yoga, Mobility & Mental Focus");
            result.put("weeklySplit", "6-Day Holistic Yogic Flow & Flexibility");

            Map<String, Object> day1 = new HashMap<>();
            day1.put("day", "Day 1: Spinal Decompression & Morning Flow");
            day1.put("focus", "Vertebral mobility, neck release, morning vitality");
            day1.put("exercises", List.of(
                Map.of("name", "Surya Namaskar Series A", "sets", "6 Rounds", "reps", "Breath synced", "rest", "30s", "note", "Ujjayi pranayama breath throughout."),
                Map.of("name", "Trikonasana (Triangle Pose)", "sets", "3 Sets", "reps", "5 Breaths / side", "rest", "30s", "note", "Open chest towards sky."),
                Map.of("name", "Bhujangasana (Cobra Pose)", "sets", "3 Sets", "reps", "20s Hold", "rest", "30s", "note", "Shoulders drawn away from ears.")
            ));
            days.add(day1);
        } else {
            result.put("goalTitle", "Calisthenics Strength & Core");
            result.put("weeklySplit", "4-Day Upper/Lower Bodyweight Split");

            Map<String, Object> day1 = new HashMap<>();
            day1.put("day", "Day 1: Upper Body Pushing & Core");
            day1.put("focus", "Chest, Triceps, Anterior Delts, Abs");
            day1.put("exercises", List.of(
                Map.of("name", "Standard / Diamond Pushups", "sets", "4 Sets", "reps", "12-15 Reps", "rest", "60s", "note", "Keep elbows at 45 degrees, full lockout."),
                Map.of("name", "Pike Pushups (Shoulder Press)", "sets", "3 Sets", "reps", "8-10 Reps", "rest", "75s", "note", "Elevate feet for handstand progression."),
                Map.of("name", "Chair / Bench Dips", "sets", "3 Sets", "reps", "15 Reps", "rest", "60s", "note", "Chest up, lower until arms hit 90 degrees.")
            ));
            days.add(day1);
        }

        result.put("days", days);
        return result;
    }
}
