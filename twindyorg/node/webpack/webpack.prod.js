const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(base, {
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(['dist']), // 重新编译时先清理输出目录
        new webpack.HashedModuleIdsPlugin(), // 不管再添加任何新的本地依赖，对于每次构建，vendor hash 都应该保持一致
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});