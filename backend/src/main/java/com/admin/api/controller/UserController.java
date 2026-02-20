package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.api.entity.User;
import com.admin.api.model.UserRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")

public class UserController {

    @Autowired
    private UserService userService;

    // CREATE
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<User>> createUser(@RequestBody UserRequest dto) {
        try {
            User user = userService.createUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("User created successfully", user, true));

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(e.getMessage(), null, false));
        }
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable int id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(new ApiResponse<>("User found", user, true)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>("User not found", null, false)));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>("No users found", null, false));
        }

        return ResponseEntity.ok(new ApiResponse<>("Users fetched successfully", users, true));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserRequest>> updateUser(
            @PathVariable int id,
            @RequestBody UserRequest dto) {

        UserRequest updated = userService.updateUser(id, dto);

        if (updated != null) {
            return ResponseEntity.ok(new ApiResponse<>("User updated successfully", updated, true));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("User not found", null, false));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable int id) {

        boolean deleted = userService.deleteUser(id);

        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>("User deleted successfully", null, true));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("User not found", null, false));
    }
}
