package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admin.api.entity.StudentFees;
import com.admin.api.model.StudentFeesRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.StudentFeesService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/fees")
public class StudentFessController {

	@Autowired
	private StudentFeesService service;

	@PostMapping("/studentFees")
	public ResponseEntity<ApiResponse<StudentFees>> createStudentFees(
			@Valid @RequestBody StudentFeesRequest studentFeesRequest) {
		StudentFees studentFees = service.createStudentFees(studentFeesRequest);
		return new ResponseEntity<>(new ApiResponse<>("Student fees created successfully", studentFees, true),
				HttpStatus.CREATED);
	}

	@GetMapping("/studentFees/{id}")
	public ResponseEntity<ApiResponse<StudentFees>> getStudentFeesById(@PathVariable Long id) {
		return service.getStudentFeesById(id)
				.map(studentFees -> new ResponseEntity<>(
						new ApiResponse<>("Student fees fetched successfully", studentFees, true), HttpStatus.OK))
				.orElse(new ResponseEntity<>(new ApiResponse<>("Student not found", null, false),
						HttpStatus.NOT_FOUND));
	}

	@GetMapping("/studentFees")
	public ResponseEntity<ApiResponse<List<StudentFees>>> getAllStudentsFees() {
		List<StudentFees> students = service.getAllStudentFees();
		if (students.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse<>("No students found in database", null, false),
					HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(new ApiResponse<>("Student fees list fetched successfully", students, true),
				HttpStatus.OK);
	}

	@PutMapping("/studentFees/{id}")
	public ResponseEntity<ApiResponse<StudentFees>> updateStudentFeesById(@PathVariable Long id,
			@Valid @RequestBody StudentFeesRequest studentFeesRequest) {
		StudentFees updated = service.updateStudentFeesById(id, studentFeesRequest);
		if (updated != null) {
			return ResponseEntity.ok(new ApiResponse<>("Student fees updated successfully", updated, true));
		}
		return new ResponseEntity<>(new ApiResponse<>("Student not found", null, false), HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/studentFees/{id}")
	public ResponseEntity<ApiResponse<Object>> deleteStudentFeesById(@PathVariable Long id) {
		boolean deleted = service.deleteStudentFeesById(id);
		if (deleted) {
			return ResponseEntity.ok(new ApiResponse<>("Student fees deleted successfully", null, true));
		}
		return new ResponseEntity<>(new ApiResponse<>("Student not found", null, false), HttpStatus.NOT_FOUND);
	}
}
