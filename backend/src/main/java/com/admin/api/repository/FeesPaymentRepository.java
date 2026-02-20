package com.admin.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.admin.api.entity.FeesPayment;

public interface FeesPaymentRepository extends JpaRepository<FeesPayment, Long> {
	

    List<FeesPayment> findByPaymentDate(LocalDate date);

    @Query("SELECT SUM(f.paidAmount) FROM FeesPayment f WHERE f.paymentDate = :date")
    Double totalCollectionByDate(@Param("date") LocalDate date);

    @Query("SELECT SUM(f.paidAmount) FROM FeesPayment f WHERE f.paymentDate = :date AND f.paymentMode = :mode")
    Double totalCollectionByMode(@Param("date") LocalDate date, @Param("mode") String mode);

    @Query("SELECT COUNT(DISTINCT f.studentFees) FROM FeesPayment f WHERE f.paymentDate = :date")
    Long totalStudentsPaidByDate(@Param("date") LocalDate date);
    

    Page<FeesPayment> findAll(Pageable pageable);

	List<FeesPayment> findByStudentId(String studentId);
    
   
}

