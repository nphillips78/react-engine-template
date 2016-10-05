require('./css/style.css');

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
    if (requirejs) {
        requirejs.config({
            paths: {
                'react': [
                    '//cdnjs.cloudflare.com/ajax/libs/react/' + versions['react'] + '/react.min',
                    '//cdn.jsdelivr.net/react/' + versions['react'] + '/react.min',
                    '//unpkg.com/react@' + versions['react'] + '/dist/react.min'
                ],
                'react-dom': [
                    '//cdnjs.cloudflare.com/ajax/libs/react/' + versions['react-dom'] + '/react-dom.min',
                    '//cdn.jsdelivr.net/react/' + versions['react-dom'] + '/react-dom.min',
                    '//unpkg.com/react-dom@' + versions['react-dom'] + '/dist/react-dom.min'
                ],
                'react-router': [
                    '//cdnjs.cloudflare.com/ajax/libs/react-router/' + versions['react-router'] + '/ReactRouter.min',
                    '//unpkg.com/react-router@' + versions['react-router'] + '/umd/ReactRouter.min'
                ]
            },
            shim: {
                'react-router': {
                    deps: ['react']
                }
            }
        });
    }

    /**
     * Mount on client-side.
     */
    function boot() {
        var client = require('react-engine/lib/client');
        client.boot({
            routes: require('../routes/Routes'),
            viewResolver: function(viewName) {
                return require('../views/' + viewName);
            }
        });
    }

    // load modules via Require.js on production
    if (isProduction) {
        requirejs(
            ['react', 'react-dom', 'react-router'],
            function(React, ReactDOM, ReactRouter) {
                window.React = React;
                window.ReactDOM = ReactDOM;
                window.ReactRouter = ReactRouter;
                boot();
            }
        );

    // load modules via WebpackDevServer on development
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            boot();
        });
    }

})(window, document, window.requirejs, window.define);
