'use strict';

/**
 * Module dependencies.
 */
var React = require('react');
var Layout = require('./Layout');
var Counter = require('./Counter');

/**
 * Index component.
 */
module.exports = React.createClass({
    displayName: 'Index',
    render: function() {
        return (
            <Layout {...this.props}>
                <h1>{this.props.title}</h1>
                <p>Welcome to {this.props.title}</p>
                <Counter />
            </Layout>
        );
    }
});
