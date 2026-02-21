package com.admin.api.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // ✔ Changed to Long

    @NotBlank
    @Column(name = "staff_name")
    private String staffName;

    @NotBlank
    @Email
    @Column(name = "email_id", unique = true)
    private String emailId;

    @NotBlank
    @Pattern(regexp = "^(\\+91[-\\s]?)?[6-9]\\d{9}$")
    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @NotBlank
    @Column(name = "city_name")
    private String cityName;

    @NotBlank
    private String degree;

    @NotBlank
    @Column(name = "role_name")
    private String roleName;

    @NotBlank
    private String skills;

    @NotBlank
    @Column(name = "joining_date")
    private String joiningDate;

    @Positive
    private double salary;

    @NotNull(message = "Aadhar card number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhar must be 12 digits")
    @Column(name = "aadhar_card", unique = true)
    private String adharCard;   // <-- changed to String

    @NotBlank(message = "PAN card number is required")
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]$", message = "Invalid PAN format")
    @Column(name = "pan_card", unique = true)
    private String panCard;     // <-- changed to String

    @NotBlank
    @Column(name = "original_certification")
    private String originalCertification;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;
    
    @ManyToMany(mappedBy = "staffs", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Batch> batches;
}
