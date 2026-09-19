package com.swasthyasangam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @PostMapping("/auth/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "message", "User registered successfully for Swasthya Sangam",
            "userId", "user_" + System.currentTimeMillis()
        ));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "token", "sih_jwt_token_demo_987",
            "message", "Authentication successful"
        ));
    }

    @PutMapping("/users/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@RequestBody Map<String, Object> profileData) {
        return ResponseEntity.ok(Map.of(
            "status", "UPDATED",
            "message", "Fitness profile and metrics persisted in database",
            "profile", profileData
        ));
    }
}
