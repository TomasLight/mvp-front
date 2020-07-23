import { merge } from "webpack-merge";

import common from "./webpack.common";

const prodWebpackConfig = merge(common, {
    mode: "production",
    optimization: {
        // splitChunks: {
        //     chunks: "all",
        // },
        moduleIds: "hashed",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
});

module.exports = prodWebpackConfig;
