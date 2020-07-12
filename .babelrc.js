const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
            "useBuiltIns": "usage",
            "corejs": "3.6.5"
        }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
];

const alias = {
    "@app": "./src/app",

    "@main": "./src/app/main",
    "@MainState": "./src/app/main/config/redux/State.ts",

    "@pos": "./src/app/pos",
    "@PosState": "./src/app/pos/config/redux/State.ts",

    "@ws": "./src/app/workspace",
    "@WsState": "./src/app/workspace/config/redux/State.ts",

    "@api": "./src/api",
    "@config": "./src/config/index.ts",
    "@enums": "./src/enums/index.ts",
    "@models": "./src/models/index.ts",
    "@selectors": "./src/utils/redux/selectors/index.ts",

    "@shared": "./src/shared",
    "@icons": "./src/shared/atoms/icons",
    "@select": "./src/shared/organisms/Fields/Select",

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
