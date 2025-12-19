package com.chessfull.chessfull.UserManagement;

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