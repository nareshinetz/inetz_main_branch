package com.admin.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.admin.api.entity.Admin;
import com.admin.api.model.AdminRequest;

@Repository
public interface AdminRepository extends CrudRepository<Admin, Integer> {

	String save(AdminRequest adminModel);

}
