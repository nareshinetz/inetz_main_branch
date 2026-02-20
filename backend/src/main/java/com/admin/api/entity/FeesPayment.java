package com.admin.api.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "fees_payment")
public class FeesPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @Column(length = 20)
    private String studentId;

    @Column(length = 50)
    private String studentName;

    private Double paidAmount;

    private LocalDate paymentDate;

    private String paymentMode;

    @ManyToOne
    @JoinColumn(name = "student_fees_id")
    @JsonBackReference
    private StudentFees studentFees;

}
