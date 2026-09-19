package com.swasthyasangam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @GetMapping("/partners")
    public ResponseEntity<List<Map<String, Object>>> getCommunityPartners(@RequestParam(required = false) String sport) {
        List<Map<String, Object>> partners = List.of(
            Map.of(
                "id", "partner_1",
                "name", "Rohan Kulkarni",
                "age", 22,
                "location", "Green Park Sports Arena (0.8 km)",
                "lat", 28.5585,
                "lng", 77.2025,
                "sports", List.of("Football", "Running", "Calisthenics"),
                "level", "Intermediate",
                "compatibility", "98% Match",
                "bio", "Looking for morning football buddies and calisthenics partners at park bars."
            ),
            Map.of(
                "id", "partner_2",
                "name", "Pooja Sharma",
                "age", 21,
                "location", "Lotus Temple Grounds (1.4 km)",
                "lat", 28.5535,
                "lng", 77.2588,
                "sports", List.of("Yoga", "Pranayama", "Badminton"),
                "level", "Advanced",
                "compatibility", "94% Match",
                "bio", "Certified student yoga practitioner conducting sunrise Surya Namaskar."
            ),
            Map.of(
                "id", "partner_3",
                "name", "Vikramaditya Rao",
                "age", 24,
                "location", "University Sports Complex (2.1 km)",
                "lat", 28.5800,
                "lng", 77.2150,
                "sports", List.of("Calisthenics", "Football", "Cricket"),
                "level", "Elite",
                "compatibility", "91% Match",
                "bio", "Calisthenics fanatic training for muscle-ups and handstands."
            )
        );
        return ResponseEntity.ok(partners);
    }

    @PostMapping("/connect")
    public ResponseEntity<Map<String, Object>> connect(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(Map.of(
            "status", "CONNECTED",
            "message", "Connection request accepted. Chat channel opened.",
            "partnerId", payload.get("partnerId")
        ));
    }
}
