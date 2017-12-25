const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader', 
                        options: { importLoaders: 1 } 
                    },
                    'postcss-loader'
                ] 
            },
            // // file-loader
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: ['file-loader']
            // },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 81920
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
        new CleanWebpackPlugin(['dist']), // 重新编译时先清理输出目录
        new HtmlWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]
};
