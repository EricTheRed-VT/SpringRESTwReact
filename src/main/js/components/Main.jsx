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

    onNavigate(navUri) {
        client({
            method: 'GET', path: navUri
        }).done(employeeCollection => this.setState({
            employees: employeeCollection.entity._embedded.employees,
            attributes: this.state.attributes,
            pageSize: this.state.pageSize,
            links:employeeCollection.entity._links
        }));
    }

    onCreate(newEmployee) {
        follow(client, root, ['employees'])
            .then(
                employeeCollection => client({
                    method: 'POST',
                    path:employeeCollection.entity._links.self.href,
                    entity: newEmployee,
                    headers: {'Content-Type': 'application/json'}
                })
            ).then(
                res => follow(client, root, [{
                    rel: 'employees',
                    params: {'size': this.state.pageSize}
                }])
            ).done(
                res => this.onNavigate(
                    (typeof res.entity._links.last != "undefined") ?
                        res.entity._links.last.href :
                        res.entity._links.self.href
                )
            );
    }

    onDelete(employee) {
        client({
            method: 'DELETE',
            path: employee._links.self.href
        }).done(
            res => this.loadFromServer(this.state.pageSize)
        );
    }

    updatePageSize(pageSize) {
        if (pageSize !== this.state.pageSize) this.loadFromServer(pageSize);
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
        return (
            <EmployeeList employees={this.state.employees}
                          onCreate={this.onCreate}
                          onNavigate = {this.onNavigate}
                          onDelete = {this.onDelete}
                          updatePageSize = {this.updatePageSize}
            />
        )
    }
}