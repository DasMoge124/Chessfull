package com.chessfull.chessfull;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * Main Spring Boot application class for Chessfull.
 * Chessfull is an interactive chess learning platform that teaches strategy through real-game simulations.
 * Features include:
 * - User authentication and progress tracking
 * - Interactive chess lessons organized by skill level (Beginner, Intermediate, Advanced)
 * - Move validation and real-time feedback
 * - Lessons covering tactics like forks, pins, skewers, and checkmates
 * - Practice games based on grandmaster games
 * This application uses MongoDB for data persistence and JWT for stateless authentication.
 */
@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.chessfull.chessfull.UserManagement")
public class ChessfullApplication {
	public static void main(String[] args) {
		SpringApplication.run(ChessfullApplication.class, args);
	}
}