import path from "path";
import { DefinePlugin } from "webpack";
import dotenv from "dotenv";
import { merge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

import { tsRule } from "./rules/ts-rule";
import { imgRule } from "./rules/img-rule";
import { fontRule } from "./rules/font-rule";

const rootPath = path.join(__dirname, "..");
const envPath = path.join(rootPath, ".env");

const publicPath = path.join(rootPath, "public");
const outputPath = path.join(publicPath, "js");
const htmlTemplatePath = path.join(publicPath, "templates", "index.html");

const appPath = path.join(rootPath, "src", "app");
const adminAppPath = path.join(appPath, "admin", "index.tsx");
const siteAppPath = path.join(appPath, "workspace", "index.tsx");

function getEnvConfig() {
    const config = dotenv.config({path: envPath});
    return config.parsed;
}

const commonWebpackConfig = merge(
    {
        node: {
            fs: "empty"
        },
        entry: {
            adminApp: adminAppPath,
            siteApp: siteAppPath,
        },
        output: {
            filename: "[name].bundle.[contenthash].js",
            publicPath: "/js/",
            path: outputPath,
        },
        resolve: {
            extensions: [ ".js", ".jsx", ".ts", ".tsx" ],
            modules: [ rootPath, "node_modules" ]
        },
        plugins: [
            // increase build performance
            new ForkTsCheckerWebpackPlugin(),
            new DefinePlugin({
                "process.env": JSON.stringify(getEnvConfig()),
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                inject: "body",
                chunks: [ "adminApp" ],
                template: htmlTemplatePath,
                filename: path.join(publicPath, "admin.html"),
            }),
            new HtmlWebpackPlugin({
                inject: "body",
                chunks: [ "siteApp" ],
                template: htmlTemplatePath,
                filename: path.join(publicPath, "site.html"),
            }),
            new ManifestPlugin(),
        ],
    },
    tsRule(),
    imgRule(),
    fontRule(),
);

module.exports = commonWebpackConfig;
