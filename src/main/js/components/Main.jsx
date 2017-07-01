import React from 'react';
import client from '../client';
import follow from '../follow';
import EmployeeList from './EmployeeList';

const root = '/api';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { employees: [] };
    }

    loadFromServer(pageSize) {
        follow(client, root, [{rel: 'employees', params: {size: pageSize}}]
        ).then(employeeCollection => {
            return client({
                method: 'GET',
                path: employeeCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema=> {
                this.schema = schema.entity;
                return employeeCollection;
            });
        }).done(employeeCollection => {
            this.setState({
                employees: employeeCollection.entity._embedded.employees,
                attributes: Object.keys(this.schema.properties),
                pageSize,
                links: employeeCollection.entity._links
            });
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
        return (
            <EmployeeList employees={this.state.employees}/>
        )
    }
}