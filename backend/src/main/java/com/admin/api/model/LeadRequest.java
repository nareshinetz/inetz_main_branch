package com.admin.api.model;



import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class LeadRequest {
    
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;



	    @NotBlank(message = "Student Name cannot be empty")
	    @Size(min = 3, max = 50, message = "Name must be between 3-50 characters")
	    private String studentName;

	    @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	    private String emailId;

	    @NotBlank(message = "Phone number required")
	    //@Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
	    private String phoneNumber;

	    @NotBlank(message = "Program type required")
	    private String programType;

	    @NotBlank(message = "Course type required")
	    private String courseType;

	    @NotBlank(message = "Type of course is required")
	    private String typeOfCourse;
	    
	    @NotBlank(message = "Source required")
	    private String source;

	    @NotBlank(message = "City Name required")
	    private String cityName;

	    @NotBlank(message = "Degree required")
	    private String degree;

	    @NotBlank(message = "College Name required")
	    private String collegeName;

	    @NotBlank(message = "Status required")
	    private String status;
	    
	    @NotBlank(message = "Reminder date is required")
	    @Pattern(
	        regexp = "^\\d{4}-\\d{2}-\\d{2}$",
	        message = "Reminder date must be in the format YYYY-MM-DD"
	    )
	    private String reminderDate;

	    @Size(max = 2000, message = "Comments cannot exceed 2000 characters")
	    private String comments;

	

}
