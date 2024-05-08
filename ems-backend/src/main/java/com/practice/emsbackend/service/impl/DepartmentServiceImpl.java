package com.practice.emsbackend.service.impl;

import com.practice.emsbackend.dto.DepartmentDto;
import com.practice.emsbackend.dto.EmployeeDto;
import com.practice.emsbackend.entity.Department;
import com.practice.emsbackend.exception.ResourceNotFoundException;
import com.practice.emsbackend.mapper.DepartmentMapper;
import com.practice.emsbackend.repository.DepartmentRepository;
import com.practice.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor     //Constructor Injection
public class DepartmentServiceImpl implements DepartmentService {

//    @Autowired        //Field Injection
    private DepartmentRepository departmentRepository;
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long deptId) {
        Department department = departmentRepository.findById(deptId).orElseThrow(()->new ResourceNotFoundException("There is no department for the id: "+deptId));
        return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartment() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map(DepartmentMapper::mapToDepartmentDto).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long deptId, DepartmentDto updatedepartmentDto) {
        Department dept = departmentRepository.findById(deptId).orElseThrow(()->new ResourceNotFoundException("There is no department for the id: "+deptId));

        dept.setDepartmentName(updatedepartmentDto.getDepartmentName());
        dept.setDepartmentDetails(updatedepartmentDto.getDepartmentDetails());

        Department savedDepartment = departmentRepository.save(dept);
//        System.out.println(savedDepartment.getId());
        return DepartmentMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long deptId) {
        Department dept = departmentRepository.findById(deptId).orElseThrow(()->new ResourceNotFoundException("There is no department for the id: "+deptId));

        departmentRepository.deleteById(deptId);
    }
}
