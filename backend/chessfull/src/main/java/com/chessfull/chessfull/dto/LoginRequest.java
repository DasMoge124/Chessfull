package com.chessfull.chessfull.dto;

import lombok.Data;

/**
 * DTO (Data Transfer Object) for login requests.
 * Contains username and password fields required for user authentication.
 * Used to transfer login credentials from the frontend to the authentication endpoint.
 */
@Data
public class LoginRequest {
    private String username;
    private String password;
}