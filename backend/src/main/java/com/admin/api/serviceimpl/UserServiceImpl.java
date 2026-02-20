package com.admin.api.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.api.entity.User;
import com.admin.api.model.UserRequest;
import com.admin.api.repository.UserRepository;
import com.admin.api.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User createUser(UserRequest dto) {

        // Duplicate check using emailId
        if (repo.existsByEmailId(dto.getEmailId())) {
            throw new RuntimeException("User already exists with this email");
        }

        User user = modelMapper.map(dto, User.class);
        return repo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public Optional<User> getUserById(int id) {
        return repo.findById(id);
    }

    @Override
    public boolean deleteUser(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public UserRequest updateUser(int id, UserRequest dto) {

        Optional<User> optional = repo.findById(id);

        if (optional.isEmpty()) {
            return null;
        }

        User existing = optional.get();

        // Skip ID mapping
        modelMapper.typeMap(UserRequest.class, User.class)
                   .addMappings(m -> m.skip(User::setId));

        // Apply updates
        modelMapper.map(dto, existing);

        User saved = repo.save(existing);

        return modelMapper.map(saved, UserRequest.class);
    }
}
