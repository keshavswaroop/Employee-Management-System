package com.practice.emsbackend.mapper;

import com.practice.emsbackend.dto.DepartmentDto;
import com.practice.emsbackend.entity.Department;

public class DepartmentMapper {
    public static DepartmentDto mapToDepartmentDto(Department department) {
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDetails()
        );
    }

    public static Department mapToDepartment(DepartmentDto departmentDto) {
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDetails()
        );
    }
}
