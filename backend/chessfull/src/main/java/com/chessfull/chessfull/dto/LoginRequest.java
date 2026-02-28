package com.chessfull.chessfull.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO (Data Transfer Object) for login requests.
 * Contains username and password fields required for user authentication.
 * Used to transfer login credentials from the frontend to the authentication
 * endpoint.
 */
@Data
public class LoginRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}