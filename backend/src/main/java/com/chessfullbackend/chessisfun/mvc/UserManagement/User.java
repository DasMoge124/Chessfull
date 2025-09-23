package com.chessfullbackend.chessisfun.mvc.UserManagement;

public class User {
    private String username;
    private String password;

    // Default constructor (needed for JSON deserialization)
    public User() {
    }

    // Optional convenience constructor
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // Setters (needed for JSON deserialization)
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
