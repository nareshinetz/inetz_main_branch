package com.admin.api.service;

import java.util.List;
import java.util.Optional;

import com.admin.api.entity.User;
import com.admin.api.model.UserRequest;
import com.admin.api.model.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest dto);

    List<User> getAllUsers();

    Optional<User> getUserById(int id);

    boolean deleteUser(int id);

    UserRequest updateUser(int id, UserRequest dto);
}
