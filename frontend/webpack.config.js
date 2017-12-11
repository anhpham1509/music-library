const path = require('path');
const htmlWebpack = require('html-webpack-plugin');
const compressionWebpack = require('compression-webpack-plugin');
const webpack = require('webpack');

const configs = {
    entry: {
        app: path.join(__dirname, 'index.tsx')
    },
    output: {
        path: path.join(__dirname, '..', 'dist', 'public'),
        filename: path.join('js', 'bundle.js'),
        publicPath: "/"
    },

    devtool: "source-map",

    devServer: {
        contentBase: path.join(__dirname, '..', 'dist', 'public')
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  //'postcss-loader',
                  'sass-loader',
                ],
              }
        ]
    },

    plugins: [
        new htmlWebpack({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                caseSensitive: true,
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,

            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: path.join('js', 'vendor.js'),
            minChunks(module) {
                return module.context &&
                    module.context.indexOf('node_modules') >= 0;
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new compressionWebpack({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};

module.exports = configs;
