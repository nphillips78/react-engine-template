'use strict';

/**
 * Module dependencies.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PORT = 3001;

/**
 * Webpack development configuration.
 */
module.exports = {
    context: path.join(__dirname, '../src'),

    entry: [
        'webpack-dev-server/client?http://localhost:' + PORT, // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './js/script.js' // app entry point
        //path.join(__dirname, '../src/js/script.js')
    ],

    output: {
        path: path.join(__dirname, '../public/'),
        filename: './js/script.js',
        publicPath: 'http://localhost:' + PORT + '/public/'
    },

    debug: true,

    devtool: 'eval-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'react-hmre']
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
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        })
    ],

    devServer: {
        quiet: false, // verbose logging
        inline: true, // embed the WebpackDevServer runtime into the bundle
        port: PORT
    }
};
