package com.admin.api.model;

import lombok.Data;

@Data
public class FeesPaymentRequest {
   
	private String studentId; // ICJF0001
    private Double paidAmount;
    private String paymentMode;
}
