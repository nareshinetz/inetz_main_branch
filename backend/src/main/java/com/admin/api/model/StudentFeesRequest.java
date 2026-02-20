package com.admin.api.model;

import lombok.Data;

@Data
public class StudentFeesRequest {
	
	  

	    private Double totalFees;
	    private Double actualFees;
	    private Double paidAmount;
	    private Double pendingAmount;
	    private String status;
}
