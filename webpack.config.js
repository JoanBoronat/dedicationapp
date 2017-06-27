var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    context: __dirname + "/public",
    entry: "./index.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ["react-html-attrs"]
            }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.json$/, 
                loader: 'json-loader'
            }
        ]
    },
    output: {
        path: __dirname + "/public",
        filename: "index.min.js"
    },
    plugins: debug ? [
                        new ExtractTextPlugin("styles.css"), 
                        new webpack.HotModuleReplacementPlugin(),
                    ] : [
                        new ExtractTextPlugin("styles.css"),
                        new webpack.optimize.UglifyJsPlugin({
                                                                mangle: false,
                                                                sourcemap: false
                                                            }),
    ]
};