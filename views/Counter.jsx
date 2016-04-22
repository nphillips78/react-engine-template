'use strict';

/**
 * Module dependencies.
 */
var React = require('react');

/**
 * Counter component.
 */
module.exports = React.createClass({
    displayName: 'Counter',

    getInitialState: function() {
        return { count: 0 };
    },

    _handleClick: function() {
        this.setState({
            count: this.state.count + 1
        });
    },

    render: function() {
        return (
            <button onClick={this._handleClick} style={{ width: '50px' }}>
                {this.state.count}
            </button>
        );
    }
});
