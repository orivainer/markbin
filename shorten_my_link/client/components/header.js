import React from 'react';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <nav className="nav navbar-default">
                <div className="navbar-header">
                    <a className="navbar-brand">ShortenMyLink</a>
                </div>
            </nav>
        );
    }
}
export default Header;