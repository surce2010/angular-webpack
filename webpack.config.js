'use strict';

let path = require('path');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.npm_lifecycle_event;
let isProd = ENV === 'build';

module.exports = function makeWebpackConfig() {
    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    let config = {};

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    config.entry = {
        app: './src/app/app',
        demo: './src/views/js/demo'
    };

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    config.output = {
        // Absolute output directory
        path: path.join(__dirname, 'dist'),

        // Output path from the view of the page
        // Uses webpack-dev-server in development
        publicPath: isProd ? '/' : 'http://localhost:8080/',

        // Filename for entry points
        // Only adds hash in build mode
        filename: isProd ? 'js/[name].[hash].js' : '[name].bundle.js',

        // Filename for non-entry points
        // Only adds hash in build mode
        chunkFilename: isProd ? 'js/[name].[hash].js' : '[name].bundle.js'
    };

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    config.devtool = 'eval-source-map';

    config.resolve = {
        extensions: ['', '.js', '.json', '.less'],
        alias: {}
    };

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */

    // Initialize module
    config.module = {
        perLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            // JS LOADER
            // Reference: https://github.com/babel/babel-loader
            // Transpile .js files using babel-loader
            // Compiles ES6 and ES7 into ES5 code
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            // CSS LOADER
            // Reference: https://github.com/webpack/css-loader
            // Allow loading css through js
            //
            // Reference: https://github.com/postcss/postcss-loader
            // Postprocess your css with PostCSS plugins
            test: /\.css$/,
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            // Extract css files in production builds
            //
            // Reference: https://github.com/webpack/style-loader
            // Use style-loader in development.
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!less')
        }, {
            // ASSET LOADER
            // Reference: https://github.com/webpack/file-loader
            // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
            // Rename the file using the asset hash
            // Pass along the updated reference to your code
            // You can add here any file extension you want to get copied to your output
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            // HTML LOADER
            // Reference: https://github.com/webpack/raw-loader
            // Allow loading html through js
            test: /\.html$/,
            loader: 'raw'
        }]
    };

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [];

    // Skip rendering index.html in test mode
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),

        new webpack.ProvidePlugin({
            'angular': 'angular',
            'window.angular': 'angular',
            '_': 'lodash',
            'Mock': 'mockjs'
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/views/html/demo.html',
            filename: './demo.html',
            inject: 'body',
            chunks: ['demo']
        }),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('css/[name].[hash].css', { disable: !isProd })
    )

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin(),

            // Copy assets from the public folder
            // Reference: https://github.com/kevlened/copy-webpack-plugin
            new CopyWebpackPlugin([{
                from: path.join(__dirname, '/src/images'),
                to: path.join(__dirname, '/dist/images')
            }, {
                from: path.join(__dirname, '/src/js'),
                to: path.join(__dirname, '/dist/js')
            }])
        )
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './src',
        stats: 'minimal'
    };

    config.eslint = {
        configFile: './.eslintrc'
    };

    return config;
}();
