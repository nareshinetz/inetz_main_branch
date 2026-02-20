package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import com.admin.api.entity.Lead;
import com.admin.api.model.LeadRequest;

public interface LeadService {
    
    Lead createLead(LeadRequest leadRequest);

    Optional<LeadRequest> getLeadById(Long id);

    List<Lead> getAllLeads();

    LeadRequest updateLeadById(Long id, LeadRequest leadRequest);


    boolean deleteLeadById(Long id);
}
