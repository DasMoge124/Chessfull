package com.chessfull.chessfull.UserManagement;

public interface UserInterface {
    String getUsername();

    String getEmail();

    String getPassword();

    void setEmail(String email);

    void setUsername(String username);

    void setPassword(String password);
}
