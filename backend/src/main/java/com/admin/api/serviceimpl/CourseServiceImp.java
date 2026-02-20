package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Course;
import com.admin.api.model.CourseRequest;
import com.admin.api.repository.CourseRepository;
import com.admin.api.service.CourseService;

@Service
public class CourseServiceImp implements CourseService {

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Course createCourse(CourseRequest dto) {

		// Duplicate check based on courseName
		if (courseRepository.existsByCourseName(dto.getCourseName())) {
			throw new RuntimeException("Course already exists with this name");
		}

		Course course = modelMapper.map(dto, Course.class);

		return courseRepository.save(course);
	}

	@Override
	public List<Course> getAllCourses() {
		return courseRepository.findAll();
	}

	@Override
	public Optional<Course> getCourseById(Long id) {
		return courseRepository.findById(id);
	}

	@Override
	public boolean deleteCourseById(Long id) {
		if (courseRepository.existsById(id)) {
			courseRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public CourseRequest updateCourseById(Long id, CourseRequest courseRequest) {
		Optional<Course> optionalCourse = courseRepository.findById(id);

		if (optionalCourse.isEmpty()) {
			return null;
		}

		Course existing = optionalCourse.get();

		// Configure ModelMapper to skip the ID field
		modelMapper.typeMap(CourseRequest.class, Course.class).addMappings(mapper -> mapper.skip(Course::setId));

		// Map updated fields
		modelMapper.map(courseRequest, existing);

		// Save updated entity
		Course updatedEntity = courseRepository.save(existing);

		// Map back to CourseRequest
		return modelMapper.map(updatedEntity, CourseRequest.class);
	}
}
