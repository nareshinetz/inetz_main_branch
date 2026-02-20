package com.admin.api.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffRequest {
	 @NotBlank(message = "Staff name is required")
	    @Size(min = 3, max = 50, message = "Staff name must be between 3 and 50 characters")
	    private String staffName;

	    @NotBlank(message = "Email ID is required")
	    @Email(message = "Invalid email format")
	    private String emailId;

	    @NotBlank(message = "Phone number is required")
	    @Pattern(
	        regexp = "^[6-9]\\d{9}$",
	        message = "Phone number must be a valid 10-digit Indian mobile number"
	    )
	    private String phoneNumber;

	    @NotBlank(message = "City name is required")
	    @Size(min = 2, max = 30, message = "City name must be between 2 and 30 characters")
	    private String cityName;

	    @NotBlank(message = "Degree is required")
	    @Size(min = 2, max = 50, message = "Degree must be between 2 and 50 characters")
	    private String degree;

	    @NotBlank(message = "Role name is required")
	    @Pattern(
	        regexp = "ADMIN|STAFF|TRAINER|HR",
	        message = "Role must be ADMIN, STAFF, TRAINER, or HR"
	    )
	    private String roleName;

	    @NotBlank(message = "Skills are required")
	    @Size(min = 3, max = 100, message = "Skills must be between 3 and 100 characters")
	    private String skills;

	    @NotNull(message = "Joining date is required")
	    @Pattern(
	        regexp = "^\\d{4}-\\d{2}-\\d{2}$",
	        message = "Joining date must be in yyyy-MM-dd format"
	    )
	    private String joiningDate;

	    @Positive(message = "Salary must be greater than 0")
	    private double salary;

	    @NotBlank(message = "Aadhaar number is required")
	    @Pattern(
	        regexp = "^\\d{12}$",
	        message = "Aadhaar number must be exactly 12 digits"
	    )
	    private String adharCard;

	    @NotBlank(message = "PAN card number is required")
	    @Pattern(
	        regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
	        message = "Invalid PAN card format"
	    )
	    private String panCard;

	    @NotBlank(message = "Original certification status is required")
	    @Pattern(
	        regexp = "YES|NO",
	        message = "Original certification must be YES or NO"
	    )
	    private String originalCertification;
}
