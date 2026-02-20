package com.admin.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="LeadTable")
public class Lead {
    
    
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String studentName;
	private String emailId;
	private String phoneNumber;
	private String programType;
	private String  typeOfCourse;
	private String courseType;
	private String source; 
	private String cityName;
	private String degree;
	private String collegeName;
	private String reminderDate;
	private String status; 
	
	


	@Column(length = 2000)
	private String comments;



}
