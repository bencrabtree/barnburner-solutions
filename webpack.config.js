const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack')

const serverConfig = {
    mode: process.env.NODE_ENV,
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
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [ nodeExternals() ]
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
                test: /\.(jp|sv)|g$/,
                loader: "url-loader"
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
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new webpack.ProvidePlugin({
               process: 'process/browser',
        }),
    ]
}

module.exports = [ serverConfig, clientConfig ];