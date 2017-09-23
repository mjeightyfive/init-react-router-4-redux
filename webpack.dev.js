/* eslint-disable */
const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */

const PORT = 3000;
const LOCALHOST = '127.0.0.1';

const browserlist = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

module.exports = (args) => {
    let entry = [];

    if(args.hot) {
        entry = {
            vendor: [
                'normalize.css/normalize.css',
                'materialize-css/dist/css/materialize.css'
            ],
            app: [
                'react-hot-loader/patch',
                `webpack-dev-server/client?http://${LOCALHOST}:${PORT}/`,
                'webpack/hot/only-dev-server',
                './app.js'
            ]
        };
    } else {
        entry = {
            vendor: [
                'normalize.css/normalize.css',
                'materialize-css/dist/css/materialize.css'
            ],
            app: './app.js'
        };
    }

    const config = {
        context: resolve('src'),
        entry,
        output: {
            filename: '[name].js',
            path: resolve('dist'),
            pathinfo: true
        },
        cache: true,
        devtool: 'cheap-module-source-map',
        devServer: {
            contentBase: resolve('dist'),
            port: PORT,
            historyApiFallback: true,
            stats: {
                assets: true,
                cached: false,
                cachedAssets: false,
                children: true,
                chunks: false,
                chunkModules: false,
                chunkOrigins: false,
                colors: true,
                maxModules: 100
            }
        },
        module: {
            rules: [{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=assets/'
            }, {
                test: /\.(jpg|png|gif)$/,
                loaders: [
                    'file-loader?name=[name].[ext]&publicPath=images/&outputPath=assets/', {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            // optimizationLevel: 7,
                            // interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }, {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            modules: false,
                            targets: browserlist,
                            useBuiltIns: true
                        }],
                        'react'
                    ],
                    plugins: [
                        ['transform-class-properties'],
                        ['transform-object-rest-spread',
                            {
                                useBuiltIns: true
                            }
                        ]
                    ]
                }
            }, {
                test: /.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        query: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                autoprefixer({
                                    browsers: browserlist
                                })
                            ]
                        }
                    }, {
                        loader: 'sass-loader',
                        query: {
                            sourceMap: true
                        }
                    }]
                })
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: false
            }),
            new ExtractTextPlugin({
                filename: '[name].css',
                disable: false,
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: Infinity
            }),
            new webpack.EvalSourceMapDevToolPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }),
        ]
    };

    return config;
};
