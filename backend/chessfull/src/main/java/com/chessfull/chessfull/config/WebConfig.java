package com.chessfull.chessfull.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration for CORS (Cross-Origin Resource Sharing) settings.
 * Allows the frontend (running on localhost or Netlify) to make requests to the backend API.
 * Enables specific HTTP methods (GET, POST, PUT, DELETE) needed for the chess learning platform.
 */
@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allows CORS requests to all paths ("/**")
                registry.addMapping("/**")
                        // FIX: Allows all origins. This fixes the "No 'Access-Control-Allow-Origin'
                        // header" error.
                        .allowedOrigins("*")
                        // Allow the HTTP methods needed by your frontend
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        // Allows all headers in the request
                        .allowedHeaders("*")
                        // Since you are using a wildcard (*), allowCredentials must be false
                        .allowCredentials(false);
            }
        };
    }
}