const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      app: './app/index.jsx'
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'assets/scripts/[name].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|es6)$/,
          include: [
            path.resolve(__dirname, 'app')
          ],
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'views/index.hbs',
        chunks: ['app'],
        hash: true,
        template: './app/views/index.ejs'
      })
    ]
  }
}
