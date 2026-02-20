package com.admin.api.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "Intern_Table")
public class Intern {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String studentName;
	private String emailId;
	private String phoneNumber;
	private String programType;
	private String modeOfTraining;
	private String courseName;
	private String batchNumber;
	private LocalDate batchStartDate;
	private LocalDate batchEndDate;
	private String courseTiming;
	private String trainerName;
	private String collegeName;
	private String degree;
	private String department;
	private String cityName;
	private String yearOfStudy;
	private String status;

	@Column(length = 1000)
	private String comments;

}

