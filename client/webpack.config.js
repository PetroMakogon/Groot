const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['env', 'react', 'flow'] },
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.graphql?$/,
                use: [
                    {
                        loader: 'webpack-graphql-loader',
                        options: {
                            output: "string",
                            minify: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
        path: path.resolve(__dirname, "../public/scripts"),
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devtool: 'source-map',
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
};