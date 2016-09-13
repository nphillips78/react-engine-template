require('../css/style.css');

(function(window, document, requirejs, define){
    'use strict';

    // config
    try {
        var config = JSON.parse(
            document.getElementById('data-config').getAttribute('data-config')
        );
        var isProduction = config.isProduction;
        var versions = config.versions;
    } catch (error) {
        // console.log(error);
    }

    /**
     * Require.js config.
     */
    requirejs.config({
        paths: {
            'react': [
                '//cdnjs.cloudflare.com/ajax/libs/react/' + versions['react'] + '/react.min',
                '//cdn.jsdelivr.net/react/' + versions['react'] + '/react.min'
            ],
            'react-dom': [
                '//cdnjs.cloudflare.com/ajax/libs/react/' + versions['react-dom'] + '/react-dom.min',
                '//cdn.jsdelivr.net/react/' + versions['react-dom'] + '/react-dom.min'
            ],
            'react-router': [
                '//cdnjs.cloudflare.com/ajax/libs/react-router/' + versions['react-router'] + '/ReactRouter.min'
            ]
        }
    });

    /**
     * Mount on client-side.
     */
    function boot() {
        var client = require('react-engine/lib/client');
        client.boot({
            routes: require('../../routes/Routes'),
            viewResolver: function(viewName) {
                return require('../../views/' + viewName);
            }
        });
    }

    // load modules via Require.js on production
    if (isProduction) {
        requirejs(['react', 'react-dom'], function(React, ReactDOM) {
            window.React = React;
            window.ReactDOM = ReactDOM;

            requirejs(['react-router'], function(ReactRouter) {
                window.ReactRouter = ReactRouter;
                boot();
            });
        });

    // load modules via WebpackDevServer on development
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            boot();
        });
    }

})(window, document, window.requirejs, window.define);
