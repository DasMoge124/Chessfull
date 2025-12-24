package com.chessfull.chessfull.UserManagement;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProgressRepository extends MongoRepository<Progress, String> {
    // Finds all progress records for a specific user email
    List<Progress> findByUserEmail(String userEmail);

    // Checks if a record already exists so we don't save duplicates
    boolean existsByUserEmailAndLessonId(String userEmail, String lessonId);
}