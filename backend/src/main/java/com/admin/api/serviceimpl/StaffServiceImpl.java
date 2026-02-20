package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Staff;
import com.admin.api.model.StaffRequest;
import com.admin.api.repository.StaffRepository;
import com.admin.api.service.StaffService;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Staff createStaff(StaffRequest staffRequest) {

        if (staffRepository.existsByEmailId(staffRequest.getEmailId())) {
            throw new RuntimeException("Email already exists");
        }

        if (staffRepository.existsByPhoneNumber(staffRequest.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists");
        }

        if (staffRepository.existsByPanCard(staffRequest.getPanCard())) {
            throw new RuntimeException("PAN card already exists");
        }

        if (staffRepository.existsByAdharCard(staffRequest.getAdharCard())) {
            throw new RuntimeException("Aadhaar number already exists");
        }

        modelMapper.typeMap(StaffRequest.class, Staff.class)
                   .addMappings(m -> m.skip(Staff::setId));

        Staff staff = modelMapper.map(staffRequest, Staff.class);
        return staffRepository.save(staff);
    }


    @Override
    public Optional<StaffRequest> getStaffById(long id) {

        return staffRepository.findById(id)
                .map(entity -> modelMapper.map(entity, StaffRequest.class));
    }

    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public StaffRequest updateStaffById(long id, StaffRequest staffRequest) {

        Optional<Staff> optional = staffRepository.findById(id);

        if (optional.isEmpty()) return null;

        Staff existing = optional.get();

        // ✅ Skip ID update
        modelMapper.typeMap(StaffRequest.class, Staff.class)
                   .addMappings(m -> m.skip(Staff::setId));

        modelMapper.map(staffRequest, existing);

        Staff updated = staffRepository.save(existing);

        return modelMapper.map(updated, StaffRequest.class);
    }

    @Override
    public boolean deleteStaffById(long id) {

        if (!staffRepository.existsById(id)) {
            return false;
        }

        staffRepository.deleteById(id);
        return true;
    }
}
