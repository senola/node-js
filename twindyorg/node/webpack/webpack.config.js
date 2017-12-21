const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // babel loader
            { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
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
        new webpack.optimize.UglifyJsPlugin()
    ]
};
