package com.chessfull.chessfull;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories; // <-- Import

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.chessfull.chessfull.UserManagement") // <-- Add this line
public class ChessfullApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChessfullApplication.class, args);
	}
}