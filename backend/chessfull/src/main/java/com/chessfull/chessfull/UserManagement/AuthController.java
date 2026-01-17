package com.chessfull.chessfull.UserManagement;

import com.chessfull.chessfull.JWT.JwtService;
import com.chessfull.chessfull.dto.LoginRequest;
import com.chessfull.chessfull.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication controller that handles user login and JWT token generation.
 * Validates user credentials against the database and generates a JWT token if credentials are valid.
 * Clients use the returned token to authenticate subsequent API requests.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        // 1. Authenticate the user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        // 2. Generate the token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtService.generateToken(userDetails);

        return new AuthResponse(jwt);
    }
}