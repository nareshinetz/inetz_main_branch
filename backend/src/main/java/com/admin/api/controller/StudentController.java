package com.admin.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.admin.api.entity.Student;
import com.admin.api.model.StudentRequest;
import com.admin.api.response.ApiResponse;
import com.admin.api.service.StudentService;

import jakarta.validation.Valid;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // CREATE
    @PostMapping("/students")
    public ResponseEntity<ApiResponse<?>> createStudent(
            @Valid @RequestBody StudentRequest studentRequest) {

        try {
            Student student = studentService.createStudent(studentRequest);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse<>("Student created successfully", student, true));

        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>(ex.getMessage(), null, false));
        }
    }

    // GET BY ID
    @GetMapping("/students/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable String id) {

        return studentService.getStudentById(id)
                .map(student -> ResponseEntity.ok(
                        new ApiResponse<>("Student found", student, true)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse<>("Student not found", null, false)));
    }
    
    //pagenation
    @GetMapping("/students")
    public ResponseEntity<ApiResponse<Page<Student>>> getAllStudents(
            @RequestParam int page,
            @RequestParam int size) {

        Page<Student> students = studentService.getAllStudents(page, size);

        if (students.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>("No students found", students, false));
        }

        return ResponseEntity.ok(
                new ApiResponse<>("Student list fetched", students, true));
    }
     
    //search
    @GetMapping("/students/search")
    public ResponseEntity<ApiResponse<List<Student>>> searchStudentsByName(
            @RequestParam String name) {

        List<Student> students = studentService.searchByName(name);

        if (students.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiResponse<>("No students found", students, false));
        }

        return ResponseEntity.ok(
                new ApiResponse<>("Students fetched by name", students, true));
    }


    // UPDATE
    @PutMapping("/students/{id}")
    public ResponseEntity<ApiResponse<?>> updateStudentById(
            @PathVariable String id,
            @Valid @RequestBody StudentRequest studentRequest) {

        Student updated = studentService.updateStudentById(id, studentRequest);

        if (updated != null)
            return ResponseEntity.ok(new ApiResponse<>("Updated successfully", updated, true));

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Student not found", null, false));
    }
    

    // DELETE
    @DeleteMapping("/students/{id}")
    public ResponseEntity<ApiResponse<?>> deleteStudentById(@PathVariable String id) {

        boolean deleted = studentService.deleteStudentById(id);

        if (deleted)
            return ResponseEntity.ok(new ApiResponse<>("Deleted successfully", null, true));

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>("Student not found", null, false));
    }
}
