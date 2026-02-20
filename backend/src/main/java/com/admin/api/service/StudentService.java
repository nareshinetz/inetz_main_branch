package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.admin.api.entity.Student;
import com.admin.api.model.StudentRequest;

public interface StudentService {

    Student createStudent(StudentRequest request);

    Optional<Student> getStudentById(String id);

    boolean deleteStudentById(String id);

    Student updateStudentById(String id, StudentRequest request);

    Page<Student> getAllStudents(int page, int size);
    public List<Student> searchByName(String name);
    
  
}

