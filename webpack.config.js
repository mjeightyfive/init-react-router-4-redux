const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        vendor: [
            'modern-normalize/modern-normalize.css',
            'materialize-css/dist/css/materialize.css'
        ],
        index: './src/index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: { loader: 'babel-loader' }
        }, {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader', options: { sourceMap: true } }
            ]
        }, {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } }
            ]
        }, {
            test: /\.html$/,
            use: [{ loader: 'html-loader', options: { minimize: true } }]
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=[name].[ext]&outputPath=assets/'
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
};
