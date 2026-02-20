package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admin.api.entity.Batch;
import com.admin.api.model.BatchRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.BatchService;

import jakarta.validation.Valid;

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
}
