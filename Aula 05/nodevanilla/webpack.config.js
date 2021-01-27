const webpack = require('webpack');
const path = require('path');

const HWP = require('html-webpack-plugin');

const config =  {
  entry: ['@babel/polyfill', './src/app.js'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,mode: 'development'
  },
  output: {
      filename: "bundle.js",
      //filename: "[name].[hash].js",
      path: path.join(__dirname, '/dist'),
      publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },    
      {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
          name: 'assets/[name].[ext]',
          },
      }
      
    ]
  },
    /*plugins: [
        new HWP(
            {template: path.join(__dirname, '/src/index.html')}
        )
    ]*/
};

module.exports = config;
