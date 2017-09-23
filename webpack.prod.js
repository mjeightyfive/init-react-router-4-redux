/* eslint-disable */
const { resolve } = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
/* eslint-enable import/no-extraneous-dependencies */

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

module.exports = () => {
    const config = {
        context: resolve('src'),
        entry: {
            vendor: [
                'normalize.css/normalize.css',
                'materialize-css/dist/css/materialize.css'
            ],
            app: './app.js'
        },
        output: {
            filename: '[name].js',
            path: resolve('dist')
        },
        profile: true,
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
        },
        devtool: false,
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
                    babelrc: false,
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
                inject: true
            }),
            new ExtractTextPlugin({
                filename: '[name].css',
                disable: false,
                allChunks: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'core',
                minChunks: Infinity
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new ProgressBarPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            })
        ]
    };

    return config;
};
