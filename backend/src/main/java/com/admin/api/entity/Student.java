package com.admin.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {

    @Id
    @Column(length = 20,updatable = false)
    private String id;

    private String studentName;

    @Column(unique = true)
    private String emailId;

    @Column(unique = true)
    private String phoneNumber;

    private String modeOfTraining;
    private String programType;
    private String courseName;

    private String collegeName;
    private String degree;
    private String department;
    private String cityName;
    private String yearOfStudy;

    private Double sslcMark;
    private Double hscMark;
    private Double ugMark;
    private Double pgMark;

    private Double discount;   // ✅ NEW

    private String status;

    @Column(length = 500)
    private String comments;
    
    

    
    @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "course_id", nullable = false)
@JsonIgnore
private Course course;

@OneToOne(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
@JsonManagedReference
private StudentFees studentFees;

}
