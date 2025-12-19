package com.chessfull.chessfull.UserManagement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    // Single constructor for clean dependency injection
    public UserController(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/addUser")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        if (userRepo.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        // Encode the password before saving to MongoDB
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/getAllUser")
    public List<User> getAllUser() {
        return userRepo.findAll();
    }
}