const path = require("path");
// const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        assetModuleFilename: "media/[name][ext]",
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                type: "asset/resource",
            },
        ]
    },
    plugins: [ 
        new HtmlWebPackPlugin({ 
            template: "./src/client/views/index.html", 
            filename: "./index.html",
        }) 
    ]
};


