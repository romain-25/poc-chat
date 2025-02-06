package com.openclassrooms.chatback.controller;

import com.openclassrooms.chatback.dto.UserLoginDto;
import com.openclassrooms.chatback.dto.UserRegisterDto;
import com.openclassrooms.chatback.service.JwtService;
import com.openclassrooms.chatback.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;
    /**
     * Handles user login requests by validating credentials and returning a JWT token if successful.
     *
     * @param userLogin The DTO containing the user's login credentials (email/username and password).
     * @return A ResponseEntity containing the token if login is successful, or an error message if login fails.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto userLogin) {
        return userService.checkLogin(userLogin);
    }
    /**
     * Handles user registration requests and creates a new user if the registration is successful.
     *
     * @param userRegister The DTO containing the user's registration information.
     * @return A ResponseEntity containing the registration token if successful, or a conflict status if registration fails.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDto userRegister) {
        try {
            return userService.registerUser(userRegister);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur lors de l'inscription: " + e.getMessage());
        }
    }
    /**
     * Retrieves the profile of the authenticated user, including their subscribed themes.
     *
     * @param token The JWT token from the request header used to authenticate the user.
     * @return A ResponseEntity containing the user's profile and subscribed themes.
     */
    @GetMapping("/profil")
    public ResponseEntity<?> profil(@RequestHeader("Authorization") String token){
        String email = jwtService.validateToken(token);
        return userService.getUserProfile(email);
    }

}
