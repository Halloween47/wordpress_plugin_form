// const path = require("path");

// module.exports = [
//   {
//     mode: "development",
//     entry: "./js/src/index.js",
//     output: {
//       path: path.resolve(__dirname, "js/dist"),
//       filename: "bundle.js",
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           exclude: /node_modules/,
//           use: {
//             loader: "babel-loader",
//             options: {
//               presets: ["@babel/preset-react"],
//             },
//           },
//         },
//       ],
//     },
//   },
// ];

// // const path = require("path");

// // module.exports = {
// //   entry: "./js/src/index.js",
// //   output: {
// //     path: path.resolve(__dirname, "js/dist"),
// //     filename: "bundle.js",
// //   },
// //   module: {
// //     rules: [
// //       {
// //         test: /\.(js|jsx)$/, // Supporte .js et .jsx
// //         exclude: /node_modules/,
// //         use: {
// //           loader: "babel-loader",
// //           options: {
// //             presets: ["@babel/preset-env", "@babel/preset-react"], // Ajout de preset-env
// //           },
// //         },
// //       },
// //     ],
// //   },
// //   resolve: {
// //     extensions: [".js", ".jsx"], // Ajout de .jsx
// //   },
// //   watchOptions: {
// //     ignored: /node_modules/,
// //     aggregateTimeout: 300,
// //     poll: 1000,
// //   },
// // };

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = [
  {
    mode: "development",
    // mode: "production",
    entry: "./js/src/index.js",
    output: {
      path: path.resolve(__dirname, "js/dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: "./.env", 
        systemvars: true, 
      }),
    ],
  },
];

