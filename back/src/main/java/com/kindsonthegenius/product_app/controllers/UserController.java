package com.kindsonthegenius.product_app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kindsonthegenius.product_app.model.LoginRequest;
import com.kindsonthegenius.product_app.model.PasswordResetRequest;
import com.kindsonthegenius.product_app.model.User;
import com.kindsonthegenius.product_app.services.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") Integer id) {
        return userService.getUser(id);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody() User user, @PathVariable("id") Long id) {
        return userService.updateUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> newUser(@RequestBody() User user) {
        try {
            String result = userService.addUser(user);
            if (result.equals("")) {
                return ResponseEntity.ok("Creation successufull!");
            }

            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unknown error occurred, error : " + e);
        }
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            Object result = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

            if (result instanceof User) {
                session.setAttribute("user", loginRequest.getEmail());
                return ResponseEntity.ok(result); 
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(result); 
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unknown error occurred, error: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password-email")
    public ResponseEntity<String> resetPasswordEmail(@RequestBody() String email) {
        try {
            String result = userService.SendResetPasswordEmail(email);
            if (result.equals("")) {
                return ResponseEntity.ok("Email send successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unknown error occurred, error :  + e");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody() PasswordResetRequest request) {
        try {
            String result = userService.resetPassword(request);
            if (result.equals("")) {
                return ResponseEntity.ok("Reset successful!");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unknown error occurred, error :  + e");
        }
    }
}
