package com.admin.api.service;

import java.util.List;
import com.admin.api.model.RoleRequest;

public interface RoleService {

    RoleRequest createRole(RoleRequest dto);

    RoleRequest getRoleById(Long id);

    List<RoleRequest> getAllRoles();

    RoleRequest updateRole(Long id, RoleRequest dto);

    boolean deleteRole(Long id);
}
