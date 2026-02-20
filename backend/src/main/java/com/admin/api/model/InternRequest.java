package com.admin.api.model;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class InternRequest {

	private Long id;

	@NotBlank(message = "Student name is required")
	private String studentName;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String emailId;

	@NotBlank(message = "Phone number is required")
	// @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
	private String phoneNumber;

	@NotBlank(message = "Program type is required")
	private String programType;

	@NotBlank(message = "Mode of training is required")
	private String modeOfTraining;

	@NotBlank(message = "Course name is required")
	private String courseName;

	@NotBlank(message = "Batch number is required")
	private String batchNumber;

	@NotNull(message = "Batch start date is required")
	private LocalDate batchStartDate;

	@NotNull(message = "Batch end date is required")
	private LocalDate batchEndDate;

	@NotBlank(message = "Course timing is required")
	private String courseTiming;

	@NotBlank(message = "Trainer name is required")
	private String trainerName;

	@NotBlank(message = "College name is required")
	private String collegeName;

	@NotBlank(message = "Degree is required")
	private String degree;

	@NotBlank(message = "Department is required")
	private String department;

	@NotBlank(message = "City name is required")
	private String cityName;

	@NotBlank(message = "Year of study is required")
	private String yearOfStudy;

	@NotBlank(message = "Status is required")
	private String status;

	@Size(max = 1000, message = "Comments cannot exceed 1000 characters")
	private String comments;

}

