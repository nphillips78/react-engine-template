'use strict';

/**
 * Module dependencies.
 */
var React = require('react');

/**
 * Layout component.
 */
module.exports = React.createClass({
    displayName: 'Layout',

    getDefaultProps: function() {
        return {
            isProduction: true,
            publicPath: ''
        };
    },

    render: function() {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>{this.props.title}</title>
                    <link rel='stylesheet' href={this.props.publicPath + '/css/style.css'} />
                </head>
                <body>
                    {this.props.children}
                    <script src={this.props.publicPath + '/js/script.js'} />
                </body>
            </html>
        );
    }
});
