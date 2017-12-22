const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[hash].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // babel loader
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            // css loader
            { 
                test: /\.css$/, 
                use: [
                    'style-loader',
                    'css-loader'
                ] 
            },
            // file-loader
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            // font
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // 重新编译时先清理输出目录
        new HtmlWebpackPlugin()
    ]
};
