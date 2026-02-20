package com.admin.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.api.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByCourseName(String courseName);

    Optional<Course> findByCourseName(String courseName);
}
