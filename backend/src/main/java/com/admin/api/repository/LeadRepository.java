package com.admin.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.admin.api.entity.Lead;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface LeadRepository  extends JpaRepository<Lead, Long>{
      Optional<Lead> findById(Long id);

       Optional<Lead> findByEmailIdAndPhoneNumberAndStudentName(
            String emailId, String phoneNumber, String studentName);


    
}