const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: {
        web_bml: './lib/index.ts',
        arib: './client/index.ts',
        play_local: './client/play_local.ts',
        video_list: './client/video_list.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                test: /.*\.css$/,
                type: 'asset/source',
            }
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js', '.tsx'
        ],
        fallback: {
            fs: false,  // for css (reworkcss-css)
            path: false,  // for css (reworkcss-css)
            url: false,  // for source-map-resolve
            vm: false,  // for JS-Interpreter
            Buffer: require.resolve('buffer'),  // for node-aribts
            stream: require.resolve('stream-browserify'),  // for node-aribts
        },
    },
    devtool: 'source-map',
    // babelのため
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],  // for node-aribts
        }),
        new webpack.ProvidePlugin({
            acorn: path.resolve(__dirname, 'JS-Interpreter', 'acorn.js')  // for JS-Interpreter
        }),
    ],
};

if (process.env.NODE_ENV == null) {
    module.exports.mode = "development";
}
