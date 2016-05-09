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

    getDefaultProps: function() {
        return {
            message: 'Not Found',
            error: {}
        };
    },

    render: function() {
        return (
            <Layout {...this.props}>
                <h1>{this.props.message}</h1>
                <h2>{this.props.error.status}</h2>
                <pre>{this.props.error.stack}</pre>
            </Layout>
        );
    }
});
