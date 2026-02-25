package com.admin.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.api.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {


	boolean existsByUsername(String userName);

	//boolean existsByUsername(String userName);

}

