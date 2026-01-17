package com.chessfull.chessfull.UserManagement;

/**
 * Interface defining the contract for user objects in the Chessfull application.
 * Provides getter and setter methods for user properties like username, email, and password.
 * Can be implemented by any user entity class.
 */
public interface UserInterface {
    String getUsername();

    String getEmail();

    String getPassword();

    void setEmail(String email);

    void setUsername(String username);

    void setPassword(String password);
}
