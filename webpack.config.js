// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    port: 3000,
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],    
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: 'public/*.jpg', 
          to({ context, absoluteFilename }) {
            return path.basename(absoluteFilename);
          }
        },
        // { 
        //   from: 'public/*.png', 
        //   to({ context, absoluteFilename }) {
        //     return path.basename(absoluteFilename);
        //   }
        // },
        // { 
        //   from: 'public/*.jpeg',
        //   to({ context, absoluteFilename }) {
        //     return path.basename(absoluteFilename);
        //   }
        // },
        // { 
        //   from: 'public/*.gif', 
        //   to({ context, absoluteFilename }) {
        //     return path.basename(absoluteFilename);
        //   }
        // },
        // {
        //   from: 'public/*.webp', 
        //   to({ context, absoluteFilename }) {
        //     return path.basename(absoluteFilename);
        //   }
        // }
      ],
    }),
  ],
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        include: [
          /node_modules[\\/](@azuremonitor)[\\/]/,
        ],
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.less$/i,
        use: ["less-loader"],
      },
      {
        test: /\.svg$/,
        use: [ 'svg-url-loader'],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset',
      },
      {
        test: /\.js$/,
        include: [/node_modules[\\/](@elixir|mermaid|@engagehub|filter-obj|query-string)[\\/]/],
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              ["@babel/plugin-transform-nullish-coalescing-operator"],
              ["@babel/plugin-transform-optional-chaining"],
              ["@babel/plugin-transform-spread"],
            ],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.mjs$/,
        include: [/node_modules[\\/](mermaid)[\\/]/],
        type: "javascript/auto",
      },
      { 
        test: /\.(ts|tsx)$/, 
        loader: "ts-loader" ,
        exclude: /node_modules/
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          test: /[\\/]src[\\/]/,
          name: 'build',
          chunks: 'all',
        },
      },
    },
  },
};
