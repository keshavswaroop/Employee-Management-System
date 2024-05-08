package com.practice.emsbackend.controller;

import com.practice.emsbackend.dto.EmployeeDto;
import com.practice.emsbackend.service.EmployeeSevice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeSevice employeeSevice;

    public EmployeeController(EmployeeSevice employeeSevice) {
        this.employeeSevice = employeeSevice;
    }

    //Build ADD employee rest api
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeSevice.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build GET Employee By ID rest api
@GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId) {
        EmployeeDto employeeDto = employeeSevice.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    //Build GET employee rest api
@GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employee = employeeSevice.getAllEmployee();
        return ResponseEntity.ok(employee);
    }

    //Build UPDATE employee rest api
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long empid,@RequestBody EmployeeDto updatedEmployee) {
        EmployeeDto emp = employeeSevice.updateEmployee(empid,updatedEmployee);
        return ResponseEntity.ok(emp);
    }

    //Build DELETE employee rest api
@DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long empid) {
        employeeSevice.deleteEmployee(empid);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}
