'use strict';

/**
 * Module dependencies.
 */
var React = require('react');
if (typeof __webpack_require__ === 'function') {
    require('./style.scss');
}

/**
 * Layout component.
 */
module.exports = React.createClass({
    displayName: 'Layout',

    propTypes: {
        cachebust: React.PropTypes.string,
        children: React.PropTypes.node,
        isProduction: React.PropTypes.bool,
        publicPath: React.PropTypes.string,
        title: React.PropTypes.string,
        versions: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            cachebust: '',
            isProduction: true,
            publicPath: '',
            versions: {}
        };
    },

    render: function() {
        var config = {
            isProduction: this.props.isProduction,
            versions: this.props.versions
        };

        var cachebust = (
            this.props.isProduction ?
            '?v=' + this.props.cachebust :
            ''
        );

        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>{this.props.title}</title>
                    {
                        config.isProduction &&
                        <link rel='stylesheet'
                            href={this.props.publicPath + '/css/style.css' + cachebust}
                        />
                    }
                </head>
                <body>
                    {this.props.children}
                    <div id='data-config' data-config={JSON.stringify(config)} />
                    {config.isProduction && <script src='//cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js' />}
                    <script src={this.props.publicPath + '/js/main.js' + cachebust} />
                </body>
            </html>
        );
    }
});
