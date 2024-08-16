const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./apps/hello-wasm/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    mode: "development",
    experiments: {
        asyncWebAssembly: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "apps/hello-wasm/index.html" }],
        }),
    ],
};
