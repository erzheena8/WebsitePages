const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),

        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use: ['file-loader']
            }
        ],

    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        // compress:true,
        // hot:true,
        // historyApiFallback: true
    }
}