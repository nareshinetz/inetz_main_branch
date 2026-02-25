package com.admin.api.serviceimpl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.admin.api.entity.Role;
import com.admin.api.model.RoleRequest;
import com.admin.api.repository.RoleRepository;
import com.admin.api.service.RoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository repo;
    private final ModelMapper modelMapper;

    @Override
    public RoleRequest createRole(RoleRequest dto) {
        Role role = modelMapper.map(dto, Role.class);
        Role saved = repo.save(role);
        return modelMapper.map(saved, RoleRequest.class);
    }

    @Override
    public RoleRequest getRoleById(Long id) {
        Role role = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
        return modelMapper.map(role, RoleRequest.class);
    }

    @Override
    public List<RoleRequest> getAllRoles() {
        return repo.findAll()
                .stream()
                .map(r -> modelMapper.map(r, RoleRequest.class))
                .toList();
    }

    @Override
    public RoleRequest updateRole(Long id, RoleRequest dto) {
        Role role = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

        role.setRole(dto.getRole());

        // Update permissions if provided
        role.setStudentManagement(dto.getStudentManagement() != null ? dto.getStudentManagement() : role.getStudentManagement());
        role.setStaffManagement(dto.getStaffManagement() != null ? dto.getStaffManagement() : role.getStaffManagement());
        role.setPriceManagement(dto.getPriceManagement() != null ? dto.getPriceManagement() : role.getPriceManagement());
        role.setLeadManagement(dto.getLeadManagement() != null ? dto.getLeadManagement() : role.getLeadManagement());
        role.setGenerateCertificate(dto.getGenerateCertificate() != null ? dto.getGenerateCertificate() : role.getGenerateCertificate());

        Role updated = repo.save(role);
        return modelMapper.map(updated, RoleRequest.class);
    }

    @Override
    public boolean deleteRole(Long id) {
        if (!repo.existsById(id)) {
            return false;
        }
        repo.deleteById(id);
        return true;
    }
}