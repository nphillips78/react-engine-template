require('../css/style.css');

(function(window, document){
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
})(window, document);
