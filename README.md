# SpringRESTwReact
A basic CRUD employee info site, with a Spring REST service back-end and React front-end. Complies with HATEOAS practices using HAL formatted JSON.

Made with React and Spring Boot, HATEOAS, and Data JPA; utilizing an H2 database for storage, and Maven and Webpack/Babel for build/run scripts.

### To Run:
In a terminal, call ```./mvnw spring-boot:run ``` to build all files and run the server.

Then open ```localhost:8080``` in a browser to access the site.

### Performable actions:
**Create** a new employee - click "Create", fill-in and submit dialog. Site will redirect to last page, showing the new record.

**Delete** an employee - click "Delete" on the employee's row. Site will redirect to the first page.

**Navigate** - use buttons below the table to navigate to the first, previous, next, and last pages. (These are only visible when applicable.)

**Change page size** - enter number of records per page desired in the input above the table.
