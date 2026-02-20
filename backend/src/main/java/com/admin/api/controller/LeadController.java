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


import com.admin.api.entity.Lead;
import com.admin.api.model.LeadRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.LeadService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class LeadController {
    
      @Autowired
    private LeadService leadService;

    // ---------------- CREATE -----------------
    @PostMapping("/leads")
    public ResponseEntity<ApiResponse<?>> createLead(@Valid @RequestBody LeadRequest leadRequest) {
        try {
            Lead lead = leadService.createLead(leadRequest);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("Lead created successfully", lead, true));

        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(ex.getMessage(), null, false));
        }
    }

    // ---------------- GET BY ID -----------------
    @GetMapping("/leads/{id}")
    public ResponseEntity<ApiResponse<LeadRequest>> getLeadById(@PathVariable Long id) {

        return leadService.getLeadById(id)
                .map(dto -> ResponseEntity.ok(
                        new ApiResponse<>("Lead found", dto, true)
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>("Lead not found", null, false)));
    }

    // ---------------- GET ALL -----------------
    @GetMapping("/leads")
    public ResponseEntity<ApiResponse<?>> getAllLeads() {

        List<Lead> leads = leadService.getAllLeads();

        if (leads.isEmpty()) {
            return ResponseEntity.noContent().build();  // 204 WITH NO BODY
        }

        return ResponseEntity.ok(
                new ApiResponse<>("Lead list fetched successfully", leads, true)
        );
    }

    // ---------------- UPDATE -----------------
    @PutMapping("/leads/{id}")
    public ResponseEntity<ApiResponse<?>> updateLeadById(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest leadRequest) {

        LeadRequest updatedLead = leadService.updateLeadById(id, leadRequest);

        if (updatedLead != null) {
            return ResponseEntity.ok(
                    new ApiResponse<>("Lead updated successfully", updatedLead, true)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Lead not found", null, false));
    }

    // ---------------- DELETE -----------------
    @DeleteMapping("/leads/{id}")
    public ResponseEntity<ApiResponse<?>> deleteLeadById(@PathVariable Long id) {

        boolean deleted = leadService.deleteLeadById(id);

        if (deleted) {
            return ResponseEntity.ok(
                    new ApiResponse<>("Lead deleted successfully", null, true)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Lead not found", null, false));
    }
}
