import React from 'react';
import ReactDOM from 'react-dom';

export default class UpdateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const updatedEmployee = {};
        this.props.attributes.forEach(attr => {
            updatedEmployee[attr] =
                ReactDOM.findDOMNode(this.refs[attr]).value.trim();
        });
        this.props.onUpdate(this.props.employee, updatedEmployee);

        //navigate away to hide dialog
        window.location = '#';
    }

    render() {
        const inputs = this.props.attributes.map(attr =>(
            <p key={this.props.employee.entity[attr]}>
                <input type="text"
                       placeholder={attr}
                       defaultValue={this.props.employee.entity[attr]}
                       ref={attr}
                       className="field"    />
            </p>
        ));

        const dialogId = "updateEmployee-" + this.props.employee.entity._links.self.href;

        return (
            <div key={this.props.employee.entity._links.self.href}>
                <a href={"#" + dialogId}>Update</a>
                <div id={dialogId} className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>
                        <h2>Update an employee</h2>
                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}