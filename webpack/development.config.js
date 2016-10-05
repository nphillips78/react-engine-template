'use strict';

/**
 * Module dependencies.
 */
var webpack = require('webpack');
var path = require('path');

// constants
var PORT = 8081;
var HOST = process.env.IP || 'localhost';
var URL = 'http://' + HOST + ':' + 8081;

/**
 * Webpack development configuration.
 */
module.exports = {
    entry: [
        path.join(__dirname, '../src/main.js'), // app entry point
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        'webpack-dev-server/client?' + URL // WebpackDevServer host and port
    ],

    output: {
        path: path.join(__dirname, '../build/'),
        filename: 'js/main.js',
        publicPath: URL + '/build'
    },

    debug: true,

    devtool: 'eval-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
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
                test: /\.s?css$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    // https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
        quiet: true, // don't output anything to the console
        inline: true, // embed the WebpackDevServer runtime into the bundle
        hot: true,
        host: HOST,
        port: PORT
    }
};
