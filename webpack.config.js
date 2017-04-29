const GasPlugin = require("gas-webpack-plugin");

module.exports = {
  entry: [
    "./src/main.js",
    // polyfills
    "core-js/fn/string/starts-with"
  ],
  output: {
    filename: "code.js",
    path: __dirname + "/dist"
  },
  plugins: [
    new GasPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
          plugins: ["transform-runtime"]
        },
        exclude: /node_modules/
      }
    ]
  },
}