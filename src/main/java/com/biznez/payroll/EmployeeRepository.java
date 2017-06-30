package com.biznez.payroll;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by eric on 6/30/17.
 */
public interface EmployeeRepository extends CrudRepository<Employee, Long> {}
