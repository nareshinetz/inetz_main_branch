package com.admin.api.model;

import lombok.Data;

@Data
public class RoleRequest {

    private Long id; // <- Add this to return generated ID
    private String role;
    private Boolean studentManagement;
    private Boolean staffManagement;
    private Boolean priceManagement;
    private Boolean leadManagement;
    private Boolean generateCertificate;
}