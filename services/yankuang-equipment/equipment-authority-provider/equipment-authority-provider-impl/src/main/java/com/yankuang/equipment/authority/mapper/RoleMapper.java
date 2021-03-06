package com.yankuang.equipment.authority.mapper;

import com.yankuang.equipment.authority.model.Role;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Repository
public interface RoleMapper {

    boolean create(Role role);

    boolean delete(List<String> codes);

    boolean update(Role role);

    Role findByCode(String code);

    Role findByName(String name);

    List<Role> list(Map map);

    List<Role> findByUserCode(String code);

    List<Role> findByDeptCode(String code);

}
