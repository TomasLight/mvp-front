import path from "path";
import { DefinePlugin } from "webpack";
import dotenv from "dotenv";
import { merge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin  } from "clean-webpack-plugin";

import { tsRule } from "./rules/ts-rule";
import { imgRule } from "./rules/img-rule";
import { fontRule } from "./rules/font-rule";

const paths = {
    root: path.join(__dirname, "../"),
    env: path.join(__dirname, "../.env"),

    app: path.join(__dirname, "../src/app/index.tsx"),

    output: path.join(__dirname, "../public/js"),
    public: path.join(__dirname, "../public/"),
};

const commonWebpackConfig = merge(
    {
        node: {
            fs: "empty"
        },
        entry: {
            app: [ "@babel/polyfill", paths.app ],
        },
        output: {
            filename: "[name].[contenthash].bundle.js",
            publicPath: '/js/',
            path: paths.output,
        },
        resolve: {
            extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
            modules: [ paths.root, "node_modules" ]
        },
        plugins: [
            // increase build performance
            new ForkTsCheckerWebpackPlugin(),
            new DefinePlugin({
                "process.env": JSON.stringify(dotenv.config({path: paths.env}).parsed),
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: paths.public + "index.template.html",
                filename: paths.public + "index.html",
                inject: "body"
            }),
            new ManifestPlugin(),
        ],
    },
    tsRule(),
    imgRule(),
    fontRule(),
);

module.exports = commonWebpackConfig;
