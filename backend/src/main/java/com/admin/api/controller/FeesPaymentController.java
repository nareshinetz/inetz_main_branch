package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.api.entity.FeesPayment;
import com.admin.api.model.FeesPaymentRequest;
import com.admin.api.model.FeesSummary;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.FeesPaymentService;


@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/payment")
public class FeesPaymentController {

    @Autowired
    private FeesPaymentService service;

    // Create Payment
    @PostMapping
    public ResponseEntity<ApiResponse<FeesPayment>> makePayment(
            @RequestBody FeesPaymentRequest request) {

        FeesPayment payment = service.makePayment(request);

        return ResponseEntity.ok(
                new ApiResponse<>("Payment successful", payment, true));
    }

    // Get Payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FeesPayment>> getPaymentById(
            @PathVariable Long id) {

        FeesPayment payment = service.getPaymentById(id);

        return ResponseEntity.ok(
                new ApiResponse<>("Payment fetched successfully", payment, true));
    }

    // Update Payment
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FeesPayment>> updatePayment(
            @PathVariable Long id,
            @RequestBody FeesPaymentRequest request) {

        FeesPayment updatedPayment = service.updatePayment(id, request);

        return ResponseEntity.ok(
                new ApiResponse<>("Payment updated successfully", updatedPayment, true));
    }

    // Delete Payment
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deletePayment(
            @PathVariable Long id) {

        service.deletePayment(id);

        return ResponseEntity.ok(
                new ApiResponse<>("Payment deleted successfully", null, true));
    }

    // Today Summary
    @GetMapping("/today-summary")
    public ResponseEntity<ApiResponse<FeesSummary>> getTodayFeesSummary() {
        FeesSummary summary = service.getTodayFeesSummary();
        return ResponseEntity.ok(
                new ApiResponse<>("Today's fees summary", summary, true));
    }

    // Get All Payments (Pagination)
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<Page<FeesPayment>>> getAllPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<FeesPayment> payments = service.getAllPayments(page, size);

        return ResponseEntity.ok(
                new ApiResponse<>("Payments fetched successfully", payments, true));
    }
    
 // ================= GET STUDENT TRANSACTIONS =================
    @GetMapping("/student/{studentId}")
    public ResponseEntity<ApiResponse<List<FeesPayment>>> getStudentPayments(
            @PathVariable String studentId) {

        List<FeesPayment> payments = service.findByStudentId(studentId);

        return ResponseEntity.ok(
                new ApiResponse<>("Student payment transactions fetched", payments, true));
    }


}
