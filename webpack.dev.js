const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
// See: https://stackoverflow.com/questions/62846123/getting-error-from-webpack-cli-typeerror-merge-is-not-a-function-in-webpack

module.exports = merge(common, {
    mode: 'development',
    stats: 'verbose',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ] 
            }
        ]
    }
});

