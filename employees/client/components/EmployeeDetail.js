import React from 'react';

const EmployeeDetail = ({ employee }) => {
    return (
        <div className="thumbnail" >
            <img src={employee.avatar} alt="avatar" />
            <div className="caption">
                <h3>{employee.name}</h3>
                <ul className="list-group" >
                    <li className="list-group-item">Email: {employee.email}</li>
                    <li className="list-group-item">Phone: {employee.phone}</li>
                </ul>
            </div>
        </div>
    );
};

export default EmployeeDetail;