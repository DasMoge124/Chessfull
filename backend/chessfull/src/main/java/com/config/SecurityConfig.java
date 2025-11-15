package com.chessfull.chessfull.config;

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
                // 1. Disable CSRF: Required for standard REST APIs where the client isn't
                // sending a CSRF token.
                .csrf(csrf -> csrf.disable())

                // 2. Authorize Requests: Define which paths are public.
                .authorizeHttpRequests(auth -> auth
                        // Allow anyone to access the /addUser and /getAllUser endpoints
                        .requestMatchers("/addUser", "/getAllUser").permitAll()
                        // Any other request must be authenticated (e.g., protected endpoints)
                        .anyRequest().authenticated());

        return http.build();
    }
}