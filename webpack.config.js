const path = require('path');

const config = {
    mode: 'development',
    entry: path.resolve(__dirname,'src/todo.jsx'),
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    // presets: ['env'],
                    presets: ['@babel/react', '@babel/preset-env'],
                    plugins: [
                        //'transform-decorators-legacy', 
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        'transform-class-properties'
                    ]
                }
            }
        }]
    },
    devtool: 'inline-source-map'
};

module.exports = config;