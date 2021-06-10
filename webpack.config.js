const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const serverConfig = {
    mode: process.env.NODE_ENV,
    target: 'node',
    entry: ['regenerator-runtime/runtime', './src/server/index.ts'],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [ '.ts' ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
    },
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [
        nodeExternals()
    ]
};

const clientConfig = {
    mode: process.env.NODE_ENV,
    target: 'web',
    entry: [ 'babel-polyfill', './src/client/index.js' ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.((j|t)sx?)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(jpe?g|png|svg)$/i,
                loader: "file-loader",
                options: {
                    outputPath: '../images/',
                    publicPath: '../images/'
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.ts', '.js', '.scss', '.css'],
        fallback: {
            fs: false
        }
    },
    output: {
        chunkFilename: "[name].[contenthash].js",
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public/js/'),
        publicPath: '/js/'
    },
    plugins: [
        new webpack.ProvidePlugin({
               process: 'process/browser',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/client/index.html'),
            favicon: path.resolve(__dirname, 'src/client/favicon.ico'),
            filename: '../index.html',
        }),
        // new BundleAnalyzerPlugin(),
        // new ImageMinimizerPlugin({
        //     severityError: "warning", // Ignore errors on corrupted images
        //     minimizerOptions: {
        //       plugins: ["gifsicle"],
        //     },
        //     // Disable `loader`
        //     loader: false,
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //   })
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'async',
    //         cacheGroups: {
    //             node_vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: 1,
    //                 chunks: 'async'
    //             }
    //         }
    //     }
    // }
    // externals: { sharp: 'commonjs sharp' }
};

module.exports = [ clientConfig, serverConfig ];