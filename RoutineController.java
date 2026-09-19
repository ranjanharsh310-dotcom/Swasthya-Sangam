package com.swasthyasangam.controller;

import com.swasthyasangam.service.FitnessGoalEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {

    @Autowired
    private FitnessGoalEngine fitnessGoalEngine;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateRoutine(@RequestBody Map<String, Object> request) {
        String goal = (String) request.get("goal");
        Map<String, Object> user = (Map<String, Object>) request.get("user");
        
        Double bmi = 22.5;
        String level = "Intermediate";
        
        if (user != null) {
            if (user.get("bmi") instanceof Number) {
                bmi = ((Number) user.get("bmi")).doubleValue();
            }
            if (user.get("level") != null) {
                level = (String) user.get("level");
            }
        }

        Map<String, Object> routine = fitnessGoalEngine.generateWorkoutRoutine(goal, bmi, level);
        return ResponseEntity.ok(routine);
    }
}
