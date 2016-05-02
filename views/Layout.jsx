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
            isProduction: true
        };
    },

    render: function() {
        var publicPath = this.props.isProduction ? '' : 'http://localhost:3001/public';
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>{this.props.title}</title>
                    <link rel='stylesheet' href={publicPath + '/css/style.css'} />
                </head>
                <body>
                    {this.props.children}
                    <script src={publicPath + '/js/script.js'} />
                </body>
            </html>
        );
    }
});
