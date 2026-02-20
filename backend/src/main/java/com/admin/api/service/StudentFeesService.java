package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import com.admin.api.entity.StudentFees;
import com.admin.api.model.StudentFeesRequest;

import jakarta.validation.Valid;

public interface StudentFeesService {

	StudentFees createStudentFees(@Valid StudentFeesRequest studentFeesRequest);

	Optional<StudentFees> getStudentFeesById(Long id);

	List<StudentFees> getAllStudentFees();

	StudentFees updateStudentFeesById(Long id, StudentFeesRequest studentFeesRequest);

	boolean deleteStudentFeesById(Long id);
}
