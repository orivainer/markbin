import React from 'react';

class LinkCreate extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { error: '' };
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    handelSubmit(event) {
        event.preventDefault();
        const inputValue = this.refs.link.value;
        Meteor.call('links.insert', inputValue, (error) => {
            if (error) {
                this.setState({ error: 'The URL is not valid.' });
            } else {
                this.setState({ error: '' });
                this.refs.link.value = '';
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handelSubmit}>
                <div className="form-group">
                    <label>Link to Shorten</label>
                    <input ref="link" className="form-control" />
                </div>
                <div className="text-danger">{this.state.error}</div>
                <button className="btn btn-primary">Shorten!</button>
            </form>
        );
    }
}
export default LinkCreate;