package com.chessfull.chessfull.config; // Check your package name

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF (Crucial for REST APIs to avoid 403 errors)
            .csrf(csrf -> csrf.disable())

            // 2. Authorize Requests: Define access control
            .authorizeHttpRequests(auth -> auth
                // Allow POST to /addUser (Sign Up)
                .requestMatchers("/addUser").permitAll() 
                // Allow GET to /getAllUser (If you want this public)
                .requestMatchers("/getAllUser").permitAll() 
                // You can allow all unauthenticated requests for now if you prefer:
                // .requestMatchers("/**").permitAll() 

                // All other requests must be authenticated (protected)
                .anyRequest().authenticated()
            );

        // If you are only building a REST API, you may also want to set session management to STATELESS
        // .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}