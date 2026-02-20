package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.StudentFees;
import com.admin.api.model.StudentFeesRequest;
import com.admin.api.repository.StudentFeesRepository;
import com.admin.api.service.StudentFeesService;


@Service
public class StudentFeesServiceImpl implements StudentFeesService {

	@Autowired
	private StudentFeesRepository repo;

	@Autowired
	private ModelMapper modelMapper;

	public StudentFees createStudentFees(StudentFeesRequest studentFeesRequest) {
		StudentFees studentFees = modelMapper.map(studentFeesRequest, StudentFees.class);
		return repo.save(studentFees);
	}

	public Optional<StudentFees> getStudentFeesById(Long id) {
		return repo.findById(id);
	}

	public List<StudentFees> getAllStudentFees() {
		return repo.findAll();
	}

	public StudentFees updateStudentFeesById(Long id, StudentFeesRequest studentFeesRequest) {
		return repo.findById(id).map(existing -> {
			modelMapper.map(studentFeesRequest, existing);
			return repo.save(existing);
		}).orElse(null);
	}

	public boolean deleteStudentFeesById(Long id) {
		if (repo.existsById(id)) {
			repo.deleteById(id);
			return true;
		}
		return false;
	}
}
