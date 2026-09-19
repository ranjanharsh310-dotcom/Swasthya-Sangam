package com.swasthyasangam.controller;

import com.swasthyasangam.service.GamificationEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LeaderboardController {

    @Autowired
    private GamificationEngine gamificationEngine;

    @GetMapping("/leaderboard")
    public ResponseEntity<List<Map<String, Object>>> getLeaderboard() {
        return ResponseEntity.ok(gamificationEngine.getSampleLeaderboard());
    }

    @GetMapping("/streaks/{userId}")
    public ResponseEntity<Map<String, Object>> getStreakData(@PathVariable String userId) {
        return ResponseEntity.ok(gamificationEngine.calculateStreakAndPoints(8, 4));
    }
}
