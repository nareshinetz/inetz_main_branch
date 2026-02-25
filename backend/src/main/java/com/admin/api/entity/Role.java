package com.admin.api.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@Table(name="role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="role")
    private String role;

    // Permission fields
    @Column(name="student_management")
    private Boolean studentManagement = false;

    @Column(name="staff_management")
    private Boolean staffManagement = false;

    @Column(name="price_management")
    private Boolean priceManagement = false;

    @Column(name="lead_management")
    private Boolean leadManagement = false;

    @Column(name="generate_certificate")
    private Boolean generateCertificate = false;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;
}