package com.practice.emsbackend.repository;

import com.practice.emsbackend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
