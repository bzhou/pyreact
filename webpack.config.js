var path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ManifestRevisionPlugin = require("manifest-revision-webpack-plugin")

var root = "./assets"

module.exports = {
    entry: {
        app_js: [
            root + "/scripts/app.js"
        ],
    },
    output: {
        path: "./pyreact/public",
        publicPath: "/assets/",
        filename: "[name].[chunkhash].js",
        chunkFilename: "[id].[chunkhash].chunk",
        sourceMapFilename: "[name].[chunkhash].js.map",
    },
    // devtool: "source-map",
    resolve: {
        extensions: ["", ".js", ".css", ".scss"]
    },
    module: {
        loaders: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
	        test: /\.scss$/,
	        loader: ExtractTextPlugin.extract("css!sass")
	    }, {
	        test: /\.css$/,
	        loader: "style-loader!css-loader"
	    }, {
	        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
	        loader: 'file-loader'
	    }
        ]
    },
    plugins: [
        new ManifestRevisionPlugin(path.join("pyreact", "manifest.json"), {
            rootAssetPath: root,
            ignorePaths: ["/styles", "/scripts"]
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.NoErrorsPlugin()
    ]
}
