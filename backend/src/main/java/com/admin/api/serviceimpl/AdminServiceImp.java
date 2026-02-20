package com.admin.api.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.Admin;
import com.admin.api.model.AdminRequest;
import com.admin.api.repository.AdminRepository;
import com.admin.api.service.AdminService;

@Service
public class AdminServiceImp implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Override
	public Admin create(AdminRequest adminModel) {
		Admin admin = new Admin();
		admin.setName(adminModel.getName());
		admin.setRole(adminModel.getRole());
		return adminRepository.save(admin);

	}

}
