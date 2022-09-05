const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
  entry: path.resolve(__dirname, "./index.ts"),
  mode: "development",
  module: {
    rules: [
      { test: /\.ts$/i, use: "ts-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: "ts" }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode
    ? require("./webpack.prod.config")
    : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
