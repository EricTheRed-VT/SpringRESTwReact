import React from 'react';
import client from '../client';
import follow from '../follow';
import EmployeeList from './EmployeeList';
import CreateDialog from './CreateDialog';

const root = '/api';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            attributes: [],
            pageSize: 2,
            links: {}
        };
        this.onNavigate = this.onNavigate.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updatePageSize = this.updatePageSize.bind(this);
    }

    loadFromServer(pageSize) {
        follow(client, root, [{rel: 'employees', params: {size: pageSize}}]
        ).then(
            employeeCollection => (client({
                method: 'GET',
                path: employeeCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(
                schema => {
                this.schema = schema.entity;
                this.links = employeeCollection.entity._links;
                return employeeCollection;
                }
            ))
        ).then(
            employeeCollection =>
                employeeCollection.entity._embedded.employees.map(employee => client({
                        method: 'GET',
                        path: employee._links.self.href
                    }))
        ).then(
            employeePromises => Promise.all(employeePromises)
        ).done(
            employeeCollection => this.setState({
                    employees: employeeCollection,
                    attributes: Object.keys(this.schema.properties),
                    pageSize: pageSize,
                    links: this.links
            })
        );
    }

    onNavigate(navUri) {
        client({
            method: 'GET',
            path: navUri
        }).then(employeeCollection => {
            this.links = employeeCollection.entity._links;
            return employeeCollection.entity._embedded.employees.map(employee => client({
                        method: 'GET',
                        path: employee.entity._links.self.href
                    }));
        }).then(employeePromises => Promise.all(employeePromises)
        ).done(employeeCollection => this.setState({
            employees: employeeCollection,
            attributes: Object.keys(this.schema.properties),
            pageSize: this.state.pageSize,
            links: this.links
        }));
    }

    onCreate(newEmployee) {
        const self = this;
        follow(client, root, ['employees'])
            .then(
                res => client({
                    method: 'POST',
                    path:res.entity._links.self.href,
                    entity: newEmployee,
                    headers: {'Content-Type': 'application/json'}
                })
            ).then(
                res => follow(client, root, [{
                    rel: 'employees',
                    params: {'size': self.state.pageSize}
                }])
            ).done(
                res => {
                    if (typeof res.entity._links.last != "undefined") {
                        this.onNavigate(res.entity._links.last.href);
                    } else {
                        this.onNavigate(res.entity._links.self.href);
                    }
                }
            );
    }

    onUpdate(employee, updatedEmployee) {
        client({
            method: 'PUT',
            path: employee.entity._links.self.href,
            entity: updatedEmployee,
            headers: {
                'Content-Type': 'application/json',
                'If-Match': employee.headers.Etag
            }
        }).done(
            //successFunc
            (res => this.loadFromServer(this.state.pageSize)),
            //errorFunc
            (res => (res.status.code === 412) ? //412: Precondition Failed
                alert('DENIED: Unable to update ' +
                    employee.entity._links.self.href +
                    '. Your copy is stale.')
                : null
            )
        );
    }

    onDelete(employee) {
        client({
            method: 'DELETE',
            path: employee.entity._links.self.href
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
            <div>
                <CreateDialog attributes={this.state.attributes}
                              onCreate={this.onCreate}              />

                <EmployeeList employees={this.state.employees}
                              links={this.state.links}
                              pageSize={this.state.pageSize}
                              attributes={this.state.attributes}
                              onCreate={this.onCreate}
                              onUpdate={this.onUpdate}
                              onDelete = {this.onDelete}
                              onNavigate = {this.onNavigate}
                              updatePageSize = {this.updatePageSize}
                                                                    />
            </div>
        )
    }
}