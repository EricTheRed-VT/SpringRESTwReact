package com.biznez.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Created by eric on 6/30/17.
 */

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repo) {
        repository = repo;
    }

    @Override
    public void run(String... strings) throws Exception {
        repository.save(new Employee("Frodo", "Baggins", "Ring Bearer"));
    }
}
