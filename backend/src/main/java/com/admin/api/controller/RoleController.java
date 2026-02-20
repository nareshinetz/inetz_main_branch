package com.admin.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admin.api.model.RoleRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.RoleService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService service;

    // CREATE
    @PostMapping("/roles")
    public ResponseEntity<ApiResponse<RoleRequest>> createRole(@RequestBody RoleRequest dto) {

        RoleRequest created = service.createRole(dto);

        return new ResponseEntity<>(
                new ApiResponse<>("Role created successfully", created, true),
                HttpStatus.CREATED
        );
    }

    // GET BY ID
    @GetMapping("roles/{id}")
    public ResponseEntity<ApiResponse<RoleRequest>> getRole(@PathVariable Long id) {

        RoleRequest role = service.getRoleById(id);

        return ResponseEntity.ok(
                new ApiResponse<>("Role fetched successfully", role, true)
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleRequest>>> getAllRoles() {

        List<RoleRequest> roles = service.getAllRoles();

        return ResponseEntity.ok(
                new ApiResponse<>("Roles fetched successfully", roles, true)
        );
    }

    // UPDATE
    @PutMapping("roles/{id}")
    public ResponseEntity<ApiResponse<RoleRequest>> updateRole(
            @PathVariable Long id,
            @RequestBody RoleRequest dto) {

        RoleRequest updated = service.updateRole(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>("Role updated successfully", updated, true)
        );
    }

    // DELETE
    @DeleteMapping("roles/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteRole(@PathVariable Long id) {

        boolean deleted = service.deleteRole(id);

        if (!deleted) {
            return new ResponseEntity<>(
                    new ApiResponse<>("Role not found", null, false),
                    HttpStatus.NOT_FOUND
            );
        }

        return ResponseEntity.ok(
                new ApiResponse<>("Role deleted successfully", null, true)
        );
    }
}
