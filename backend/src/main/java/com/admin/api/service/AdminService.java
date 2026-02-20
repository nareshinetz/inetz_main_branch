package com.admin.api.service;

import com.admin.api.entity.Admin;
import com.admin.api.model.AdminRequest;

public interface AdminService {

	Admin create(AdminRequest adminModel);

}
