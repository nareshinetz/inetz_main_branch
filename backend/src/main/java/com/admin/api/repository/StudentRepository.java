package com.admin.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.admin.api.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

    boolean existsByEmailId(String emailId);

    boolean existsByPhoneNumber(String phoneNumber);

    Page<Student> findAll(Pageable pageable);


    
    List<Student> findByStudentNameContainingIgnoreCase(String studentName);
    
    
   long countByProgramTypeAndCourse_CourseName(String programType, String courseName);
    	


  

	


}
