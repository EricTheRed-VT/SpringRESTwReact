import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './Employee';

export default class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleNavFirst = this.handleNavFirst.bind(this);
        this.handleNavPrev = this.handleNavPrev.bind(this);
        this.handleNavNext = this.handleNavNext.bind(this);
        this.handleNavLast = this.handleNavLast.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        let pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value =
                pageSize.substring(0, pageSize.length-1);
        }
    }

    handleNavFirst(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.first.href);
    }

    handleNavPrev(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.prev.href);
    }

    handleNavNext(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.next.href);
    }

    handleNavLast(e) {
        e.preventDefault();
        this.props.onNavigate(this.props.links.last.href);
    }

    render() {
        const employees = this.props.employees.map(employee =>
            (<Employee key={employee._links.self.href} employee={employee} onDelete={this.props.onDelete} />)
        );

        const navLinks = [];
        if (this.props.links.first) {
            navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
        };
        if (this.props.links.prev) {
            navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
        };
        if (this.props.links.next) {
            navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
        };
        if (this.props.links.last) {
            navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
        };

        return (
            <div>
                <input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
                <table>
                    <tbody>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Description</th>
                    </tr>
                    {employees}
                    </tbody>
                </table>
                <div>
                    {navLinks}
                </div>
            </div>
        );
    }
};