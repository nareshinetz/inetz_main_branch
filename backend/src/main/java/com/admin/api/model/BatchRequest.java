package com.admin.api.model;

import java.time.LocalTime;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BatchRequest {

    @NotBlank
    private String batchName;

    @NotBlank
    private String status;

    @NotNull
    private LocalTime startTime;
    @NotNull
    private LocalTime endTime;

    @NotBlank
    private String roomNumber;

    @NotEmpty
    private List<Long> staffIds;
}

