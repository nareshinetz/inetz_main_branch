package com.admin.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeesSummary {
    private Long totalStudentsPaid;
    private Double totalCollection;
    private Double cashCollection;
    private Double gpayCollection;
    private Double accountTransferCollection;
}
