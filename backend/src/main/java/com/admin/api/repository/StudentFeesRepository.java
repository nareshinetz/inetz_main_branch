package com.admin.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.admin.api.entity.StudentFees;

@Repository
public interface StudentFeesRepository  extends JpaRepository<StudentFees, Long> {
	

	@Query("SELECT sf FROM StudentFees sf WHERE sf.student.id = :studentId")
	Optional<StudentFees> findByStudentId(@Param("studentId") String studentId);
	
	

   



}