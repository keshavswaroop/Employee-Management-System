package com.practice.emsbackend.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter                 //generate getters
@Setter                 //generate setters
@NoArgsConstructor      //constructors
@AllArgsConstructor     //parameterized constructor
@Entity                 //Making it as a jpa entity
@Table(name="employees") //create a table of name employees
@ToString
public class Employee {

    @Id         //Indicate a primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)     //This indicates for the database to auto increment
    private Long id;

    @Column(name = "first_name")      //this is used to map the column name with the field name
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email")
    private String email;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_id")
    private Department department;

}
