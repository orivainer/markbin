import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Link } from 'react-router';

class BinsList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.renderList = this.renderList.bind(this);
    }

    renderList() {
        return this.props.bins.map(bin => {
            const binUrl = `/bins/${bin._id}`;
            return (
                <li className="list-group-item" key={bin._id}>
                    <Link to={binUrl}> Bin {bin._id}</Link>
                    <span className="pull-right">
                        <button
                            className="btn btn-danger"
                            onClick={() => this.onRemoveClickHandler(bin)}>
                            Remove
                        </button>
                    </span>
                </li>
            );
        });
    }

    onRemoveClickHandler(bin) {
        Meteor.call('bins.remove', bin);
    }

    render() {
        return (
            <ul className="list-group">
                {this.renderList()}
            </ul>
        );
    }
}


export default createContainer(() => {
    Meteor.subscribe('bins');
    return { bins: Bins.find({}).fetch() };
}, BinsList);