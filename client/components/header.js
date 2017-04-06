import React from 'react';
import Accounts from './accounts';
import { Link, browserHistory } from 'react-router';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.createBinHandler = this.createBinHandler.bind(this);
    }

    createBinHandler(event) {
        event.preventDefault();
        Meteor.call('bins.insert', (error, binId) => {
            browserHistory.push(`/bins/${binId}`);
        });
    }

    render() {
        return (
            <nav className="nav navbar-default">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Markbin</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li>
                        <Accounts />
                    </li>
                    <li>
                        <a href="#" onClick={this.createBinHandler}>Create Bin</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
export default Header;