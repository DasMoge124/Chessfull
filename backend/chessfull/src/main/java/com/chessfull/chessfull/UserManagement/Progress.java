package com.chessfull.chessfull.UserManagement;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_progress")
public class Progress {
    @Id
    private String id;
    private String userEmail; // It's actually the username, but we use "userEmail" for consistency with the
                              // schema
    private String lessonId;
    private LocalDateTime completionDate;

    public Progress() {
    }

    public Progress(String userEmail, String lessonId) {
        this.userEmail = userEmail;
        this.lessonId = lessonId;
        this.completionDate = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getLessonId() {
        return lessonId;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }

    public LocalDateTime getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDateTime completionDate) {
        this.completionDate = completionDate;
    }
}