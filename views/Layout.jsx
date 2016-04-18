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
    render: function() {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>{this.props.title}</title>
                    <link rel='stylesheet' href='/css/style.css' />
                </head>
                <body>
                    {this.props.children}
                    <script src='/js/script.js' />
                </body>
            </html>
        );
    }
});
