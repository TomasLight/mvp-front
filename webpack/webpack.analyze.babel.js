import { merge } from "webpack-merge";
import common from "./webpack.common";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const devWebpackConfig = merge(common, {
    mode: "production",
    plugins: [
        new BundleAnalyzerPlugin()
    ]
});

module.exports = devWebpackConfig;
