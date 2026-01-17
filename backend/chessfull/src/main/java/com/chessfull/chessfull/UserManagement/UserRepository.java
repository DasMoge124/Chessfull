package com.chessfull.chessfull.UserManagement;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for User entity.
 * Provides database access methods to query and persist User objects in MongoDB.
 * Includes custom query methods to find users by username and check for existing accounts.
 */
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}