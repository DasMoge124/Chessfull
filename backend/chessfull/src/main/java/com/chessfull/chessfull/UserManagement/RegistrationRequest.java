package com.chessfull.chessfull.UserManagement;

/**
 * DTO (Data Transfer Object) for user registration requests.
 * Contains the username, password, and email fields required for creating a new
 * user account.
 * Used to transfer registration data from the frontend to the backend API.
 */
public class RegistrationRequest {
    private String username;
    private String password;
    private String email;

    public RegistrationRequest() {
    } // Ensure there isn't a random symbol after this brace

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
} // Ensure there isn't a random symbol after this brace