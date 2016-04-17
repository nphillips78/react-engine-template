'use strict';

/**
 * Module dependencies.
 */
var React = require('react');
var Layout = require('./Layout');

/**
 * Error component.
 */
module.exports = React.createClass({
    displayName: 'Error',
    render: function() {
        return (
            <Layout>
                <h1>{this.props.message}</h1>
                <h2>{this.props.error.status}</h2>
                <pre>{this.props.error.stack}</pre>
            </Layout>
        );
    }
});
