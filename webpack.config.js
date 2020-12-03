const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')


let isDev = process.env.NODE_ENV === 'development'
let isProd = !isDev


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
// const cssLoaders = () => {
//     const loaders
// }

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization()
    ,
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.pug',
            // filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        // @ts-ignore
        // new MiniCssExtractPlugin({
        //     filename: filename('.css')
        // }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new MiniCssExtractPlugin()

    ],
    module: {
        rules: [
        //     {
        //     test: /\.css$/,
        //     use: [
        //         'style-loader',
        //         'css-loader']
        // },
            {
            test: /\.pug$/,
            // loaders: [{loader: 'html-loader'}, {'pug-html-loader'}]
        },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader']
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 '@babel/preset-env'
            //             ]
            //         }
            //     }
            // },

        ],

    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        hot: true
    }
}