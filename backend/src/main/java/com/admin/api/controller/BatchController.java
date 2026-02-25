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

import com.admin.api.entity.Batch;
import com.admin.api.entity.Student;
import com.admin.api.model.BatchRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.BatchService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class BatchController {

    @Autowired
    private BatchService batchService;

    // CREATE -------------------------------------------------
    @PostMapping("/batches")
    public ResponseEntity<ApiResponse<?>> createBatch(
            @Valid @RequestBody BatchRequest request) {

        try {
            Batch batch = batchService.createBatch(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("Batch created successfully", batch, true));

        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(ex.getMessage(), null, false));
        }
    }

    // GET BY ID ----------------------------------------------
    @GetMapping("/batches/{id}")
    public ResponseEntity<ApiResponse<Batch>> getBatchById(@PathVariable Long id) {

        return batchService.getBatchById(id)
                .map(batch -> ResponseEntity.ok(
                        new ApiResponse<>("Batch fetched successfully", batch, true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>("Batch not found", null, false)));
    }

    // GET ALL ------------------------------------------------
    @GetMapping("/batches")
    public ResponseEntity<ApiResponse<List<Batch>>> getAllBatches() {

        List<Batch> batchList = batchService.getAllBatch();

        if (batchList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>("No batch found in database", batchList, false));
        }

        return ResponseEntity.ok(
                new ApiResponse<>("Batch list fetched successfully", batchList, true));
    }

    // UPDATE -------------------------------------------------
    @PutMapping("/batches/{id}")
    public ResponseEntity<ApiResponse<?>> updateBatchById(
            @PathVariable Long id,
            @Valid @RequestBody BatchRequest request) {

        Batch updated = batchService.updateBatchById(id, request);

        if (updated != null) {
            return ResponseEntity.ok(
                    new ApiResponse<>("Batch updated successfully", updated, true));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Batch not found", null, false));
    }

    // DELETE -------------------------------------------------
    @DeleteMapping("/batches/{id}")
    public ResponseEntity<ApiResponse<?>> deleteBatchById(@PathVariable Long id) {

        boolean deleted = batchService.deleteBatchById(id);

        if (deleted) {
            return ResponseEntity.ok(
                    new ApiResponse<>("Batch deleted successfully", null, true));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Batch not found", null, false));
    }
    
    
    
    @GetMapping("/batches/{id}/students")
    public ResponseEntity<ApiResponse<?>> getStudentsByBatch(@PathVariable Long id) {

        try {
            List<Student> students = batchService.getStudentsByBatchId(id);

            return ResponseEntity.ok(
                    new ApiResponse<>(
                            "Students fetched for batch",
                            students,
                            true
                    )
            );

        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(ex.getMessage(), null, false));
        }
    }
}
