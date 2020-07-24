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
    "@CommonState": "./src/app/config/redux/CommonState",
    "@config": "./src/app/config",
    "@data": "./src/data/index.ts",
    "@enums": "./src/enums/index.ts",
    "@icons": "./src/shared/atoms/icons",
    "@selectors": "./src/app/config/redux/selectors/index.ts",
    "@shared": "./src/shared",

    "@admin": "./src/app/admin",
    "@AdminState": "./src/app/admin/config/redux/State.ts",

    "@ws": "./src/app/workspace",
    "@WsState": "./src/app/workspace/config/redux/State.ts",


    "@api": "./src/api",
    "@models": "./src/app/models",
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
