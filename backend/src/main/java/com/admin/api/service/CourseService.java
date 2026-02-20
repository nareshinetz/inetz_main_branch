package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import com.admin.api.entity.Course;
import com.admin.api.model.CourseRequest;

public interface CourseService {

	Course createCourse(CourseRequest courseRequest);

	List<Course> getAllCourses();

	Optional<Course> getCourseById(Long id);

	boolean deleteCourseById(Long id);

	CourseRequest updateCourseById(Long id, CourseRequest courseRequest);
}
