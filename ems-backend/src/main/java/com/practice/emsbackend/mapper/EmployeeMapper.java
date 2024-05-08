package com.practice.emsbackend.mapper;

import com.practice.emsbackend.dto.EmployeeDto;
import com.practice.emsbackend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        System.out.println(employee.getDepartment());
        return new EmployeeDto(
            employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getDepartment().getId()
        );

    }
    public static Employee mapToEmployee(EmployeeDto employeeDto) {
Employee employee = new Employee();
employee.setId(employeeDto.getId());
employee.setFirstName((employeeDto.getFirstname()));
employee.setLastName((employeeDto.getLastname()));
employee.setEmail((employeeDto.getEmail()));
return employee;
    }
}
