var path = require('path');
var webpack = require('webpack');

var vendors = [
    'angular'
];

module.exports = {
    entry: {
        lib: vendors,
    },
    output: {
        path: path.join(__dirname, 'src/js'),
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        })
    ]
};
