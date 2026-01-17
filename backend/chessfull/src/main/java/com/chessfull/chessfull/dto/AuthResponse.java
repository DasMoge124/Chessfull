package com.chessfull.chessfull.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO (Data Transfer Object) for authentication responses.
 * Contains a JWT token that is returned to the client after successful login.
 * The token is used for subsequent API requests to authenticate the user.
 */
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
}