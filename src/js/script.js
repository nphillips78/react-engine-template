require('../css/style.css');

(function(window, document){
    'use strict';

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
