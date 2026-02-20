package com.admin.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.api.entity.Intern;

public interface InternRepository  extends JpaRepository<Intern, Long>  {

	

}

