let path = require('path');
let webpack = require('webpack');

let vendors = [
    'angular',
    'lodash',
    'mockjs',
    'babel-polyfill'
];

module.exports = {
    entry: {
        lib: vendors
    },
    output: {
        path: path.join(__dirname, '/src/js'),
        filename: '[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
