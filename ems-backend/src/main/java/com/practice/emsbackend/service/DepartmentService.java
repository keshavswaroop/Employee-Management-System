package com.practice.emsbackend.service;

import com.practice.emsbackend.dto.DepartmentDto;
import com.practice.emsbackend.dto.EmployeeDto;

import java.util.List;

public interface DepartmentService {

    DepartmentDto createDepartment(DepartmentDto departmentDto);

    DepartmentDto getDepartmentById(Long deptId);

    List<DepartmentDto> getAllDepartment();

    DepartmentDto updateDepartment(Long deptId, DepartmentDto updatedepartmentDto);

    void deleteDepartment(Long deptId);
}
