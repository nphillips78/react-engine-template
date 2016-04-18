require('../css/style.css');

(function(window, document){
    'use strict';

    /**
     * Client-side mounting.
     */
    document.addEventListener('DOMContentLoaded', function() {
        require('react-engine/lib/client').boot({
            viewResolver: function(viewName) {
                return require('../../views/' + viewName);
            }
        });
    });
})(window, document);
