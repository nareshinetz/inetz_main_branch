package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Lead;
import com.admin.api.model.LeadRequest;
import com.admin.api.repository.LeadRepository;
import com.admin.api.service.LeadService;

@Service
public class LeadServiceImpl implements LeadService {
    
   @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Lead createLead(LeadRequest leadRequest) {

        // Duplicate check
        Optional<Lead> existing = leadRepository
                .findByEmailIdAndPhoneNumberAndStudentName(
                        leadRequest.getEmailId(),
                        leadRequest.getPhoneNumber(),
                        leadRequest.getStudentName()
                );

        if (existing.isPresent()) {
            throw new RuntimeException("Lead already exists with same Phone, Email and Name!");
        }

        Lead leadEntity = modelMapper.map(leadRequest, Lead.class);
        return leadRepository.save(leadEntity);
    }

    @Override
    public Optional<LeadRequest> getLeadById(Long id) {

        Optional<Lead> optionalLead = leadRepository.findById(id);

        if (optionalLead.isEmpty()) {
            return Optional.empty();
        }

        Lead lead = optionalLead.get();

        LeadRequest dto = modelMapper.map(lead, LeadRequest.class);

        return Optional.of(dto);
    }

	
    

	@Override
	public List<Lead> getAllLeads() {
		return leadRepository.findAll();
	}
	
	@Override
	public LeadRequest updateLeadById(Long id, LeadRequest leadRequest) {

	    Optional<Lead> optionalLead = leadRepository.findById(id);

	    if (optionalLead.isEmpty()) {
	        return null;
	    }

	    Lead existing = optionalLead.get();

	    // Create a typeMap only once
	    ModelMapper mapper = modelMapper;

	    mapper.typeMap(LeadRequest.class, Lead.class)
	          .addMappings(m -> m.skip(Lead::setId));

	    // Map request object to existing entity
	    mapper.map(leadRequest, existing);

	    // Save updated entity
	    Lead updatedEntity = leadRepository.save(existing);

	    // Convert Entity → DTO
	    return mapper.map(updatedEntity, LeadRequest.class);
	}


	@Override
	public boolean deleteLeadById(Long id) {
		
		if (leadRepository.existsById(id)) {
	        leadRepository.deleteById(id);
	        return true;
	    }
	    return false;
	}



	}

