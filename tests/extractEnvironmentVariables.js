const fs = require("fs");

const variables = {
    NODE_TLS_REJECT_UNAUTHORIZED: 0, // disable self signed certificate verification for tests
};

/** @param {string} file */
function getFileLines(file) {
    return file.split(/\r?\n/);
}

/** @param {string} line */
function handleLine(line) {
    if (!line || line.startsWith("#")) {
        return;
    }

    // we can't just split by '=' because cookie variable contains multiple '=' signs

    const index = line.indexOf("=");
    const name = line.substr(0, index);
    const value = line.substr(index + 1);

    variables[name] = value;
}

function getEnvVariables() {
    const file = fs.readFileSync("./.env", "utf-8");
    const lines = getFileLines(file);
    lines.forEach(handleLine);

    return variables;
}

module.exports = getEnvVariables;
