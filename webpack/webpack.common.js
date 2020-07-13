import path from "path";
import { DefinePlugin } from "webpack";
import dotenv from "dotenv";
import { merge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// import HtmlWebpackPlugin from "html-webpack-plugin";

import { tsRule } from "./rules/ts-rule";
import { imgRule } from "./rules/img-rule";
import { fontRule } from "./rules/font-rule";

const paths = {
    root: path.join(__dirname, "../"),
    env: path.join(__dirname, "../.env"),

    app: path.join(__dirname, "../src/app/index.tsx"),

    output: path.join(__dirname, "../public/js"),
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
            filename: "[name].bundle.js",
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
            // new HtmlWebpackPlugin({
            //     template: paths.output + "/src/public/index.template.html",
            //     inject: "body"
            // })
        ],
    },
    tsRule(),
    imgRule(),
    fontRule(),
);

module.exports = commonWebpackConfig;
