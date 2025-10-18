package com.chessfullbackend.chessisfun.mvc.UserManagement;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;

@RestController
public class UserController {

    private final ArrayList<User> users = new ArrayList<>();

    @PostMapping("/api/register")
    public String registerUser(@RequestBody User newUser) {
        // Check if username already exists
        for (User user : users) {
            if (user.getUsername().equals(newUser.getUsername())) {
                return "Error: Username already exists.";
            }
        }
        // Add new user
        users.add(newUser);
        return "User registered successfully.";
    }
}
