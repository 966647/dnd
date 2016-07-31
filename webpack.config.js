var webpack = require('webpack');
var path = require('path');

var buildPath = path.resolve(__dirname, '.');


module.exports = {
    entry: {
        index: ['./src/index.js']
    },
    output: {
        path: buildPath,
        filename: './build/bundle.js',
        libraryTarget: 'umd',
        library: "DnD"
    },
    watch: true,
    watchOptions:{
        aggregateTimeout: 100
    },
    plugins: [
        new webpack.ProvidePlugin({
            'Set': 'es6-set'
        }),
        new webpack.NoErrorsPlugin()
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        })/!*,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })*/
    ],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/i,
                loader: "url-loader?limit=100000"
            },

            {
                test: /\.js$/,
                exclude: /(bower_components)/,
                loader: 'babel',
                query: {
                    compact: false,
                    presets: ['es2015'],
                    plugins: [
                        "transform-es2015-block-scoping",
                        "transform-proto-to-assign",
                        "transform-class-properties",
                        ["transform-es2015-classes", {loose: true}]
                    ]
                }
            }
        ]
    },
    devtool: "source-map"
};
