'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Webpack production configuration.
 * https://github.com/webpack/docs/wiki/configuration
 */
module.exports = {
    entry: path.join(__dirname, '../src/main.js'),

    output: {
        path: path.join(__dirname, '../build'),
        filename: 'js/main.js'
    },

    debug: false,

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader?sourceMap')
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    },

    plugins: [
        new ExtractTextPlugin('css/style.css', {
            allChunks: true
        }),

        // https://github.com/webpack/docs/wiki/optimization
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ],

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'history': true
    }
};
