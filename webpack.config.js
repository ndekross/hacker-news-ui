const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: process.env.APP_MODE || "development",
  entry: ["babel-polyfill", path.resolve(__dirname, "src/index.js")],
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader"
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "syntax-dynamic-import"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Hacker News Clone",
      template: "src/index.html"
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].bundle.js",
    publicPath: "/"
  }
}
