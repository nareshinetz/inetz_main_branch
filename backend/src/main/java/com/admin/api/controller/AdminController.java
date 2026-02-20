package com.admin.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.api.entity.Admin;
import com.admin.api.model.AdminRequest;
import com.admin.api.service.AdminService;



@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	@PostMapping("/create")
	public Admin createAdminDetails(@RequestBody AdminRequest adminModel ) {
		 return adminService.create(adminModel);
				
	}
}
