const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
            "useBuiltIns": "usage",
            "corejs": "3.6.4"
        }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
];

const alias = {
    "@main": "./src/app/main",
    "@MainState": "./src/app/main/config/redux/State",

    "@pos": "./src/app/pos",
    "@PosState": "./src/app/pos/config/redux/State.ts",

    "@ws": "./src/app/workspace",
    "@WsState": "./src/app/workspace/config/redux/State",

    "@api": "./src/api",
    "@config": "./src/config/index.ts",
    "@enums": "./src/enums",
    "@selectors": "./src/utils/redux/selectors",
    "@shared": "./src/shared",
    "@icons": "./src/shared/atoms/icons",
    "@utils": "./src/utils"
};

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    [
        "babel-plugin-module-resolver",
        {
            root: [ "./src/" ],
            alias,
        },
    ],
];

/** @type {import("@babel/core").TransformOptions} */
const babelConfig = {
    presets,
    plugins,
};

module.exports = babelConfig;
