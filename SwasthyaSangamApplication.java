package com.swasthyasangam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Smart India Hackathon 2026 - Problem Statement ID: 26196
 * Theme: Fitness & Sports | Team: Naag Shakti
 * Project: Swasthya Sangam Backend REST Application
 */
@SpringBootApplication
public class SwasthyaSangamApplication {

    public static void main(String[] args) {
        SpringApplication.run(SwasthyaSangamApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("⚡ SWASTHYA SANGAM (SIH 2026) REST API BACKEND STARTED ⚡");
        System.out.println("Server running on: http://localhost:8080/api");
        System.out.println("=========================================================");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
