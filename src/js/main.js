require('../css/style.css');

(function(window, document, requirejs, define){
    'use strict';

    // config
    try {
        var config = JSON.parse(
            document.getElementById('data-config').getAttribute('data-config')
        );
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
                '//cdnjs.cloudflare.com/ajax/libs/react/' + versions['react'] + '/react.min'
            ],
            'react-dom': [
                '//cdnjs.cloudflare.com/ajax/libs/react/' + versions['react-dom'] + '/react-dom.min'
            ],
            'react-router': [
                '//cdnjs.cloudflare.com/ajax/libs/react-router/' + versions['react-router'] + '/ReactRouter.min'
            ]
        }
    });

    /**
     * Mount on client-side.
     */
    requirejs(['react', 'react-dom'], function(React, ReactDOM) {
        window.React = React;
        window.ReactDOM = ReactDOM;

        requirejs(['react-router'], function(ReactRouter) {
            window.ReactRouter = ReactRouter;

            var client = require('react-engine/lib/client');
            client.boot({
                routes: require('../../routes/Routes'),
                viewResolver: function(viewName) {
                    return require('../../views/' + viewName);
                }
            });
        });
    });

})(window, document, window.requirejs, window.define);
