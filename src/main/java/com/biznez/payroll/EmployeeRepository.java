package com.biznez.payroll;


import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by eric on 6/30/17.
 */
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {}
