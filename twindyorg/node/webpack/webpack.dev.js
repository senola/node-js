const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const path = require('path');

module.exports = merge(base, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase:  path.join(__dirname, 'dist'),
        compress: true, // 开启gzip压缩
        hot: true // 热更新
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
});