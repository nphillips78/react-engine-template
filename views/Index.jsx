'use strict';

/**
 * Module dependencies.
 */
var React = require('react');
var Counter = require('./Counter');

/**
 * Index component.
 */
module.exports = React.createClass({
    displayName: 'Index',

    propTypes: {
        title: React.PropTypes.string
    },

    render: function() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>Welcome to {this.props.title}</p>
                <Counter />
            </div>
        );
    }
});
