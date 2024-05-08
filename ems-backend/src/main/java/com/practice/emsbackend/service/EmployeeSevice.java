package com.practice.emsbackend.service;

import com.practice.emsbackend.dto.EmployeeDto;

import java.util.List;

public interface EmployeeSevice {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto> getAllEmployee();

    EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee);

    void deleteEmployee(Long empid);
}
