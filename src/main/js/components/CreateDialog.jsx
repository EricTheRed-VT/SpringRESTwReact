import React from 'react';
import ReactDOM from 'react-dom';

export default class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const newEmployee = {};
        this.props.attributes.forEach(attr => {
            newEmployee[attr] =
                ReactDOM.findDOMNode(this.refs[attr]).value.trim();
        });
        this.props.onCreate(newEmployee);

        //clear inputs
        this.props.attributes.forEach(attr => {
            ReactDOM.findDOMNode(this.refs[attr]).value = '';
        });

        //navigate away to hide dialog
        window.location = '#';
    }

    render() {
        const inputs = this.props.attributes.map(attr => (
            <p key={attr}>
                <input type="text" placeholder={attr} ref={attr} className="field"/>
            </p>
        ));

        return (
            <div>
                <a href="#createEmployee">Create</a>
                <div id="createEmployee" classname="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>
                        <h2>Create new employee</h2>
                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}