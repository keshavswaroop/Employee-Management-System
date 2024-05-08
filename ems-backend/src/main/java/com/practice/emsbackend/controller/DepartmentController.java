package com.practice.emsbackend.controller;

import com.practice.emsbackend.dto.DepartmentDto;
import com.practice.emsbackend.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/department")
@CrossOrigin("*")
@AllArgsConstructor
public class DepartmentController {

    private DepartmentService departmentService;

    @PostMapping
public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto) {
    DepartmentDto savedDepartment = departmentService.createDepartment(departmentDto);
    return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
}

@GetMapping("/{id}")
public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long deptId) {
        DepartmentDto departmentDto = departmentService.getDepartmentById(deptId);
        return ResponseEntity.ok(departmentDto);
}

@GetMapping
public ResponseEntity<List<DepartmentDto>> getDepartment() {
        List<DepartmentDto> departmentDto = departmentService.getAllDepartment();
        return ResponseEntity.ok(departmentDto);
}
@PutMapping("/{id}")
public  ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long deptId,@RequestBody DepartmentDto departmentDto) {
    System.out.println("hi");
        DepartmentDto updateInfo = departmentService.updateDepartment(deptId, departmentDto);

        return ResponseEntity.ok(updateInfo);
}
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long deptId) {
        departmentService.deleteDepartment(deptId);
        return ResponseEntity.ok("Department Deleted Successfully");
}


}
