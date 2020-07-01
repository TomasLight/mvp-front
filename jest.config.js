const {pathsToModuleNameMapper} = require("ts-jest/utils");
const {compilerOptions} = require("./tsconfig");

/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths,
        {
            prefix: "<rootDir>/src/"
        }
    ),
    globals: {
        "ts-jest": {
            "astTransformers": [ "ts-nameof" ]
        }
    },
    transformIgnorePatterns: [
        "<rootDir>/(node_modules)/"
    ],
    testMatch: [
        "<rootDir>/**/*.test.ts(x)",
    ],
    snapshotSerializers: [
        "enzyme-to-json/serializer",
    ],
    setupFiles: [
        "<rootDir>/jest.enzyme-adapter.js",
    ],
};

module.exports = config;
