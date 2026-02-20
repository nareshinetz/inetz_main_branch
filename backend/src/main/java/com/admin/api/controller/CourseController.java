package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admin.api.constant.Constant;
import com.admin.api.entity.Course;
import com.admin.api.model.CourseRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.CourseService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/course")
public class CourseController {

	@Autowired
	private CourseService courseService;

	// CREATE
	@PostMapping("/courses")
	public ResponseEntity<ApiResponse<Course>> createCourse(@Valid @RequestBody CourseRequest courseRequest) {
		try {
			Course course = courseService.createCourse(courseRequest);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new ApiResponse<>("Course created successfully", course, true));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(e.getMessage(), null, false));
		}
	}

	// GET BY ID
	@GetMapping("/courses/{id}")
	public ResponseEntity<ApiResponse<Course>> getCourseById(@PathVariable Long id) {
		return courseService.getCourseById(id)
				.map(course -> ResponseEntity.ok(new ApiResponse<>("Course fetched successfully", course, true)))
				.orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(Constant.COURSE_NOT_FOUND, null, false)));
	}

	// GET ALL
	@GetMapping("/courses")
	public ResponseEntity<ApiResponse<List<Course>>> getAllCourses() {
		List<Course> courses = courseService.getAllCourses();
		if (courses.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.body(new ApiResponse<>("No courses found", null, false));
		}
		return ResponseEntity.ok(new ApiResponse<>("Courses fetched successfully", courses, true));
	}

	// UPDATE
	@PutMapping("/courses/{id}")
	public ResponseEntity<ApiResponse<CourseRequest>> updateCourseById(@PathVariable Long id,
			@Valid @RequestBody CourseRequest courseRequest) {

		CourseRequest updated = courseService.updateCourseById(id, courseRequest);
		if (updated != null) {
			return ResponseEntity.ok(new ApiResponse<>(Constant.COURSE_UPDATED_SUCCESS, updated, true));
		}

		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ApiResponse<>(Constant.COURSE_NOT_FOUND, null, false));
	}

	// DELETE
	@DeleteMapping("/courses/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteCourseById(@PathVariable Long id) {
		boolean deleted = courseService.deleteCourseById(id);
		if (deleted) {
			return ResponseEntity.ok(new ApiResponse<>("Course deleted successfully", null, true));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ApiResponse<>(Constant.COURSE_NOT_FOUND, null, false));
	}
}
