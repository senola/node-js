const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: './src/index.js',
        vendor: [
            'lodash'
        ]
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // babel loader
            { 
                test: /\.js$/, 
                include: path.resolve(__dirname, "src"), 
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            },
            // css loader
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                            {
                                loader: 'css-loader',
                                options: { importLoaders: 1 }
                            }, 
                            'postcss-loader'
                        ]
                  })
                // use: [`
                //     'style-loader',
                //     { 
                //         loader: 'css-loader', 
                //         options: { importLoaders: 1 } 
                //     },
                //     'postcss-loader'
                // ] 
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            },
            // font
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo',
            inject: true,
            favicon: 'favicon.ico'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new ExtractTextPlugin({
            filename: 'app.[contenthash].css',
            allChunks: true
        })
    ]
};
