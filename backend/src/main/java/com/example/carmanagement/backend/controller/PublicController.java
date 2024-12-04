package com.example.carmanagement.backend.controller;

import com.example.carmanagement.backend.entity.User;
import com.example.carmanagement.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    @Autowired
    private UserService userService;
    @GetMapping("/health-check")
    public String healthCheck() {
        return "OK";
    }
    @PostMapping("/createUser")
    public ResponseEntity<?> addUser(@RequestBody User user){
        userService.saveNewUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
