package com.admin.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.api.constant.Constant;
import com.admin.api.entity.Intern;
import com.admin.api.model.InternRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.InternService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class InternController {

	@Autowired
	private InternService internService;

	@PostMapping("/intern")
	public ResponseEntity<ApiResponse<Intern>> createIntern(@Valid @RequestBody InternRequest internRequest) {
		Intern createdIntern = internService.createIntern(internRequest);

		ApiResponse<Intern> response = new ApiResponse<>("Intern created successfully", createdIntern, true);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@GetMapping("/intern/{id}")
	public ResponseEntity<ApiResponse<?>> getInternById(@PathVariable Long id) {
		Optional<Intern> intern = internService.getInternById(id);

		if (intern.isPresent()) {
			ApiResponse<Intern> response = new ApiResponse<>("Intern fetched successfully", intern.get(), true);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		ApiResponse<String> response = new ApiResponse<>(Constant.STUDENT_NOT_FOUND, null, false);

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	}

	@GetMapping("/intern")
	public ResponseEntity<ApiResponse<List<Intern>>> getAllInterns() {
		List<Intern> interns = internService.getAllIntern();

		if (interns.isEmpty()) {
			ApiResponse<List<Intern>> response = new ApiResponse<>("No interns found in database", null, false);
			return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
		}

		ApiResponse<List<Intern>> response = new ApiResponse<>("Intern list fetched successfully", interns, true);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}