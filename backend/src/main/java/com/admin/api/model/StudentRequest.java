package com.admin.api.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StudentRequest {

 

    @NotBlank(message = "Student name is required")
    @Size(min = 2, max = 100, message = "Student name must be between 2 and 100 characters")
    private String studentName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String emailId;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Mode of training is required")
    private String modeOfTraining;

    @NotBlank(message = "Course number is required")
    private String courseNumber;
    
    @NotBlank(message = "programtype is required")
	private String programType;
    
    @NotBlank(message = "Course name is required")
    @Size(min = 2, max = 100, message = "Course name must be between 2 and 100 characters")
    private String courseName;
    
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

    @Min(value = 0, message = "SSLC mark must be >= 0")
    @Max(value = 100, message = "SSLC mark must be <= 100")
    private Double sslcMark;

    @Min(value = 0, message = "HSC mark must be >= 0")
    @Max(value = 100, message = "HSC mark must be <= 100")
    private Double hscMark;

    @Min(value = 0, message = "UG mark must be >= 0")
    @Max(value = 100, message = "UG mark must be <= 100")
    private Double ugMark;

    @Min(value = 0, message = "PG mark must be >= 0")
    @Max(value = 100, message = "PG mark must be <= 100")
    private Double pgMark;

    @NotBlank(message = "Status is required")
    private String status;

    @Size(max = 500, message = "Comments can be up to 500 characters only")
    private String comments;

    private Double discount; 
    
    
    
    @NotNull(message = "Batch ID is required")
    private Long batchId;

 
   
}
