const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    entry: {
        app: './src/js/app.js',
        admin: './src/js/admin.js',
        common: './src/js/common.js',
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'css/calculator.css',
            chunkFilename: 'calculator.css',
        }),
        new HtmlWebpackPlugin({
            filename: 'calculator.html',
            template: __dirname + '/src/public/calculator.html',
            chunks: ['common', 'app'],
            inject: 'body',
            description: 'Calculator App',
        }),
        new HtmlWebpackPlugin({
            filename: 'calculator-admin.html',
            template: __dirname + '/src/public/calculator.html',
            chunks: ['common', 'admin'],
            inject: 'body',
            description: 'Admin App',
        }),

    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(s*)css$/,
                use: ['postcss-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        configFile: path.resolve(__dirname, '.eslintrc')
                    },
                },
            },
        ]
    }
};