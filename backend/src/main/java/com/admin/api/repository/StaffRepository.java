package com.admin.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.api.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByEmailIdAndPhoneNumber(String emailId, String phoneNumber);
    boolean existsByEmailId(String emailId);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByPanCard(String panCard);
    boolean existsByAdharCard(String adharCard);
}
