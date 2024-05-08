package com.practice.emsbackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="department")
@ToString
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="department_name")
    private String departmentName;
    @Column(name="department_details")
    private String departmentDetails;
}
