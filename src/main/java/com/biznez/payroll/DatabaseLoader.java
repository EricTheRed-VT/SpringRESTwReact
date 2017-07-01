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
        repository.save(new Employee("Bilbo", "Baggins", "Burglar"));
        repository.save(new Employee("Gandalf", "the Grey", "Wizard"));
        repository.save(new Employee("Samwise", "Gamgee", "Gardener"));
        repository.save(new Employee("Meriadoc", "Brandybuck", "Pony Rider"));
        repository.save(new Employee("Peregrin", "Took", "Pipe Smoker"));
    }
}
