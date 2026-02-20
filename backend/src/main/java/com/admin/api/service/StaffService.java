package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import com.admin.api.entity.Staff;
import com.admin.api.model.StaffRequest;

public interface StaffService {
    
    Staff createStaff(StaffRequest staffRequest);
    Optional<StaffRequest> getStaffById(long id);
    List<Staff> getAllStaff();
    StaffRequest updateStaffById(long id, StaffRequest staffRequest);
    boolean deleteStaffById(long id);
}
