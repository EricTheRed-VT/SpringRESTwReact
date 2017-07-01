package com.biznez.payroll;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by eric on 6/30/17.
 */

@Data
@Entity
public class Employee {
    @Id @GeneratedValue private Long id;
    private String firstName;
    private  String lastName;
    private String description;

    private Employee() {

    }
    public Employee(String first, String last, String descrip) {
        firstName = first;
        lastName = last;
        description = descrip;
    }
}
