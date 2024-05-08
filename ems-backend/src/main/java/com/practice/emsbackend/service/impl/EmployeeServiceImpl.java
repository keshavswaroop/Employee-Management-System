package com.practice.emsbackend.service.impl;

import com.practice.emsbackend.dto.EmployeeDto;
import com.practice.emsbackend.entity.Department;
import com.practice.emsbackend.entity.Employee;
import com.practice.emsbackend.exception.ResourceNotFoundException;
import com.practice.emsbackend.mapper.DepartmentMapper;
import com.practice.emsbackend.mapper.EmployeeMapper;
import com.practice.emsbackend.repository.DepartmentRepository;
import com.practice.emsbackend.repository.EmployeeRepository;
import com.practice.emsbackend.service.EmployeeSevice;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service        //this tells to create a spring bean of EmployeeServiceImpl
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeSevice {

    private EmployeeRepository employeeRepository;      //injecting dependancies
    private DepartmentRepository departmentRepository;


    @Override
    //here the request is comming from postman. So the incomming input is of the typw dto
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);

        Department department = departmentRepository.findById(employeeDto.getDept_id()).orElseThrow(()->new ResourceNotFoundException("No department with Id "+ employeeDto.getDept_id()));

        employee.setDepartment(department);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee doesnot exists with the given id" + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
        System.out.println(employees);
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee emp = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("The employee doesnot exits with the id: " + employeeId));

        //set the updated values to the emp variable
        emp.setFirstName(updatedEmployee.getFirstname());
        emp.setLastName(updatedEmployee.getLastname());
        emp.setEmail(updatedEmployee.getEmail());


        Department department = departmentRepository.findById(updatedEmployee.getDept_id()).orElseThrow(()->new ResourceNotFoundException("No department with Id "+ updatedEmployee.getDept_id()));

        emp.setDepartment(department);

        //update the changes on the database
        //the save method not only saves the info to the database, it also updates the information, if the id doesn't exixts, then it creates a new employee details
        Employee updatedEmployeeObj = employeeRepository.save(emp);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long empid) {
        Employee reqEmployee = employeeRepository.findById(empid).orElseThrow(()->new ResourceNotFoundException("The employee doesnot existes with the following id: "+empid));
        employeeRepository.deleteById(empid);
    }
}
