import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../Imports/collections/employees';
import EmployeeDetail from './EmployeeDetail';
import * as consts from '../../Imports/constants';

class EmployeeList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.page = 1;
        this.clickHandler = this.clickHandler.bind(this);
    }
    //  props.employees => an array of employee object
    clickHandler() {
        this.page += 1;
        const newPageSize = consts.CARDS_PER_PAGE * this.page;
        Meteor.subscribe('employees', newPageSize);
    }
    render() {
        return (
            <div>
                <div className="employee-list">
                    {this.props.employees.map(employee =>
                        <EmployeeDetail employee={employee} key={employee._id} />)}
                </div>
                <button onClick={this.clickHandler} className="btn btn-primary">Load More...</button>
            </div>
        );
    }
}

export default createContainer(() => {
    // Set up subscription
    Meteor.subscribe('employees', consts.CARDS_PER_PAGE);
    // Return an object. Whatever we return will be sent to EmployeeList as props
    return { employees: Employees.find({}).fetch() };
}, EmployeeList);
