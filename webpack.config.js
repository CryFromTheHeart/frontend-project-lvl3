import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new HtmlWebpackPlugin()],
};
