package com.chessfull.chessfull.UserManagement;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Progress controller that manages user progress tracking in the Chessfull application.
 * Handles endpoints for saving lesson completion and retrieving completed lessons for a user.
 * Ensures that authenticated users can only access and modify their own progress records.
 */
@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressRepository progressRepository;

    // 1. SAVE PROGRESS (POST)
    @PostMapping("/complete/{lessonId}")
    public ResponseEntity<?> saveProgress(@PathVariable("lessonId") String lessonId, Principal principal) {
        if (principal == null) {
            // If this prints, the JWT filter didn't set the user in the context
            return ResponseEntity.status(401).body("User not authenticated");
        }
        String email = principal.getName();

        // Check if already completed to avoid duplicate entries
        if (progressRepository.existsByUserEmailAndLessonId(email, lessonId)) {
            return ResponseEntity.ok("Lesson already marked as complete.");
        }

        Progress progress = new Progress(email, lessonId);
        progressRepository.save(progress);
        return ResponseEntity.ok("Progress saved for: " + email);
    }

    // 2. GET PROGRESS (GET)
    // This returns a list of lesson strings: ["magnus_v_bardiya", "opening_basics"]
    @GetMapping("/my-lessons")
    public ResponseEntity<List<String>> getMyCompletedLessons(Principal principal) {
        String email = principal.getName();

        List<Progress> progressList = progressRepository.findByUserEmail(email);

        // Extract just the lesson IDs from the objects
        List<String> completedLessonIds = progressList.stream()
                .map(Progress::getLessonId)
                .collect(Collectors.toList());

        return ResponseEntity.ok(completedLessonIds);
    }
}