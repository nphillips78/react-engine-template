'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack configuration.
 * https://github.com/webpack/docs/wiki/configuration
 */
module.exports = {
    context: path.join(__dirname, '../src'),

    entry: './js/script.js',

    output: {
        path: path.join(__dirname, '../public'),
        filename: 'js/script.js'
    },

    debug: true,

    devtool: 'inline-source-map', // or "source-map"

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap')
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    },

    plugins: [
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        })
    ]
};
