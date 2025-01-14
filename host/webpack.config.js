const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
// const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index",
  mode: "development",
  stats: {
    errorDetails: true,
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@http://localhost:3002/remoteEntry.js",
      },
      exposes: {
        "./store": path.resolve(__dirname, "./src/store/index"),
        "./rate": path.resolve(__dirname, "./src/store/reducers/rate"),
        "./transaction": path.resolve(
          __dirname,
          "./src/store/reducers/transaction"
        ),
      },
      shared: {
        "react": { singleton: true },
        "react-dom": { singleton: true },
        "react-redux": { singleton: true },
        "redux": { singleton: true },
      },
    }),
    new ModuleFederationPlugin({
      name: "app3",
      remotes: {
        app3: "app3@http://localhost:3003/remoteEntry.js",
      },
      exposes: {
        "./store": path.resolve(__dirname, "./src/store/index"),
        "./rate": path.resolve(__dirname, "./src/store/reducers/rate"),
        "./transaction": path.resolve(
          __dirname,
          "./src/store/reducers/transaction"
        ),
      },
      shared: {
        "react": { singleton: true },
        "react-dom": { singleton: true },
        "react-redux": { singleton: true },
        "redux": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
