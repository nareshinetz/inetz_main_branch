package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.admin.api.model.StaffRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.StaffService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping("/staff")
    public ResponseEntity<ApiResponse<?>> createStaff(@Valid @RequestBody StaffRequest staffRequest) {

        try {
            var staff = staffService.createStaff(staffRequest);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("Staff created successfully", staff, true));

        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(ex.getMessage(), null, false));
        }
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<ApiResponse<StaffRequest>> getStaffById(@PathVariable long id) {

        return staffService.getStaffById(id)
                .map(dto -> ResponseEntity.ok(new ApiResponse<>("Staff found", dto, true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>("Staff not found", null, false)));
    }

    @GetMapping("/staff")
    public ResponseEntity<ApiResponse<?>> getAllStaff() {

        List<?> list = staffService.getAllStaff();

        if (list.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok(new ApiResponse<>("Staff list fetched", list, true));
    }

    @PutMapping("/staff/{id}")
    public ResponseEntity<ApiResponse<?>> updateStaffById(
            @PathVariable long id,
            @Valid @RequestBody StaffRequest staffRequest) {

        StaffRequest updated = staffService.updateStaffById(id, staffRequest);

        if (updated != null)
            return ResponseEntity.ok(new ApiResponse<>("Updated successfully", updated, true));

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Staff not found", null, false));
    }

    @DeleteMapping("/staff/{id}")
    public ResponseEntity<ApiResponse<?>> deleteStaffById(@PathVariable long id) {

        boolean deleted = staffService.deleteStaffById(id);

        if (deleted)
            return ResponseEntity.ok(new ApiResponse<>("Deleted successfully", null, true));

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Staff not found", null, false));
    }
}
