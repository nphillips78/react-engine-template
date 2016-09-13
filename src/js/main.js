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
     * Client-side mounting.
     */
    document.addEventListener('DOMContentLoaded', function() {
        var client = require('react-engine/lib/client');

        client.boot({
            routes: require('../../routes/Routes'),
            viewResolver: function(viewName) {
                return require('../../views/' + viewName);
            }
        });
    });

})(window, document, window.requirejs, window.define);
